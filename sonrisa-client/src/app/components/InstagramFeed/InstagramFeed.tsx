import { Api, IInstagramMedia, logger } from '@core';
import {
  faInstagram,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import styles from './InstagramFeed.module.scss';

export const InstagramFeed = () => {
  const [feed, setFeed] = useState<IInstagramMedia[]>([]);

  const [limitIndex, setLimitIndex] = useState(8);

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

  return (
    <div className={styles.instagramFeedWrap}>
      {!feed.length ? (
        <div className={styles.spinnerWrap}>
          <LoadingSpinner color="dark" />
        </div>
      ) : (
        <div className={styles.instagramFeedInner}>
          {feed.slice(0, 10).map((img, i) => (
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
