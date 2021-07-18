import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useInterval } from '@core';
import styles from './ImageSlider.module.scss';

type ImageSliderProps = {
  images: string[];

  autoSlide?: boolean;
};

enum SlideDirections {
  LEFT = -1,
  RIGHT = 1,
}

const getImgStyle = (
  url: string,
  duration: number,
  x: number
): React.CSSProperties => ({
  backgroundImage: `url(${url})`,
  transition: `${duration}s`,
  transform: `translateX(${x}%)`,
});

export const ImageSlider = ({
  images,
  autoSlide = false,
}: ImageSliderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [currentSlideStyle, setCurrentSlideStyle] = useState(
    getImgStyle(images[currentImageIndex], 0, 0)
  );

  const [nextSlideStyle, setNextSlideStyle] = useState(
    getImgStyle(images[currentImageIndex + 1], 0, 100)
  );

  const { toggleInterval } = useInterval(
    () => next(currentImageIndex + 1),
    2000,
    false
  );

  const [isSliding, setIsSliding] = useState(false);

  const [slideDirection, setSlideDirection] = useState(SlideDirections.LEFT);

  const next = (index: number) => {
    const dir =
      index > currentImageIndex ? SlideDirections.LEFT : SlideDirections.RIGHT;
    const currX = 0;
    const nextX = -(100 * dir);

    if (index >= images.length) {
      index = 0;
    } else if (index < 0) {
      index = images.length - 1;
    }

    setCurrentSlideStyle(getImgStyle(images[currentImageIndex], 0, currX));
    setNextSlideStyle(getImgStyle(images[index], 0, nextX));
    setCurrentImageIndex(index);
    setSlideDirection(dir);
    setIsSliding(true);
  };

  const handleSlideEnd = () => {
    setIsSliding(false);
  };

  useEffect(() => {
    if (autoSlide && images && images.length > 1) {
      toggleInterval();
    }
  }, []);

  useEffect(() => {
    if (!isSliding) {
      return;
    }

    const currIndex =
      slideDirection === SlideDirections.LEFT
        ? currentImageIndex - 1 < 0
          ? images.length - 1
          : currentImageIndex - 1
        : currentImageIndex + 1 >= images.length
        ? 0
        : currentImageIndex + 1;

    const currX = 100 * slideDirection;
    const nextX = 0;

    setCurrentSlideStyle(getImgStyle(images[currIndex], 1, currX));
    setNextSlideStyle(getImgStyle(images[currentImageIndex], 1, nextX));

    setIsSliding(false);
  }, [isSliding, slideDirection, currentImageIndex, images]);

  return (
    <div className={styles.imgSliderWrap}>
      <div className={styles.imagesWrap}>
        <div
          style={currentSlideStyle}
          className={styles.currentImgDiv}
          onTransitionEnd={handleSlideEnd}
        ></div>
        <div
          style={nextSlideStyle}
          className={styles.nextImgDiv}
          onTransitionEnd={handleSlideEnd}
        ></div>

        {!autoSlide && images && images.length > 1 && (
          <div className={styles.imgArrowsWrap}>
            <button
              onClick={() => {
                next(currentImageIndex - 1);
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
              onClick={() => {
                next(currentImageIndex + 1);
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
