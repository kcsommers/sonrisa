import { Api, IInstagramMedia, logger } from '@core';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import styles from './InstagramFeed.module.scss';

export const InstagramFeed = () => {
  const [feed, setFeed] = useState<IInstagramMedia[]>([]);

  const [limitIndex, setLimitIndex] = useState(10);

  const containerEl = useRef<HTMLDivElement>();

  const _setIndexLimit = useCallback((): void => {
    if (!containerEl.current) {
      return;
    }

    const _containerWidth = containerEl.current.getBoundingClientRect().width;
    if (_containerWidth >= 812) {
      setLimitIndex(10);
      return;
    }
    if (_containerWidth >= 560) {
      setLimitIndex(8);
      return;
    }
    setLimitIndex(6);
  }, []);

  useEffect(() => {
    Api.getInstagramFeed()
      .then((res) => {
        logger.log('[instagram feed]::: ', res.data);
        setFeed(res.data.data);
      })
      .catch((err) => {
        logger.error('[fetch feed error]:::: ', err);
      });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', _setIndexLimit);
    return () => document.removeEventListener('resize', _setIndexLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.instagramFeedWrap}>
      {!feed.length ? (
        <div className={styles.spinnerWrap}>
          <LoadingSpinner color="dark" />
        </div>
      ) : (
        <div
          className={styles.instagramFeedInner}
          ref={(el) => (containerEl.current = el as HTMLDivElement)}
        >
          {feed.slice(0, limitIndex).map((img, i) => (
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
    </div>
  );
};
