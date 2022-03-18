import { IInstagramMedia } from '@sonrisa/core';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Api } from '../../api';
import { logger } from '../../utils';
import { Button } from '../Button/Button';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import styles from './InstagramFeed.module.scss';

export const InstagramFeed = () => {
  const [feed, setFeed] = useState<IInstagramMedia[]>([]);

  const [nextUrl, setNextUrl] = useState<string>();

  const containerEl = useRef<HTMLDivElement>();

  const getFeed = (_currentFeed: IInstagramMedia[], _nextUrl?: string) => {
    Api.getInstagramFeed(_nextUrl)
      .then((res) => {
        logger.log('[instagram feed]::: ', res.data);
        setFeed(
          _currentFeed.concat(
            res.data.data.filter(
              (_media: IInstagramMedia) => _media.media_type !== 'VIDEO'
            )
          )
        );
        setNextUrl(res.data.paging.next);
      })
      .catch((err) => {
        logger.error('[fetch feed error]:::: ', err);
      });
  };

  useEffect(() => {
    getFeed([]);
  }, []);

  const loadMore = () => {
    getFeed(feed, nextUrl);
  };

  return (
    <div className={styles.instagramFeedWrap}>
      {!feed.length ? (
        <div className={styles.spinnerWrap}>
          <LoadingSpinner color="dark" />
        </div>
      ) : (
        <div
          className={`${styles.instagramFeedInner} responsive-container`}
          ref={(el) => (containerEl.current = el as HTMLDivElement)}
        >
          {feed.map((img, i) => (
            <a
              key={img.caption}
              className={styles.instagramImgTag}
              style={{ backgroundImage: `url(${img.media_url})` }}
              title={img.caption}
              href={img.permalink}
            >
              <span className={styles.instagramImgInner}></span>
            </a>
          ))}
        </div>
      )}
      <Button
        text="More Photos"
        isFullWidth={false}
        onClick={loadMore}
        isDisabled={!nextUrl}
      />
    </div>
  );
};
