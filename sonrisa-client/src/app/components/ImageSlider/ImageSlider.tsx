import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import styles from './ImageSlider.module.scss';
import SimpleImageSlider from 'react-simple-image-slider';

type ImageSliderProps = {
  images: string[];
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
  transform: `translateX(${x})`,
});

export const ImageSlider = ({ images }: ImageSliderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [currentSlideStyle, setCurrentSlideStyle] = useState(
    getImgStyle(images[currentImageIndex], 0, 0)
  );

  const [nextSlideStyle, setNextSlideStyle] = useState(
    getImgStyle(images[currentImageIndex + 1], 0, 100)
  );

  const [isSliding, setIsSliding] = useState(false);

  const next = (index: number) => {
    const currX = 0;
    const nextX = index > currentImageIndex ? 100 : -100;

    setCurrentSlideStyle(getImgStyle(images[currentImageIndex], 0, currX));
    setNextSlideStyle(getImgStyle(images[index], 0, nextX));
    setCurrentImageIndex(index);
    setIsSliding(true);
  };

  const handleSlideEnd = () => {
    setIsSliding(false);
  };

  useEffect(() => {
    if (!isSliding) {
      return;
    }

    console.log('EFFECT:::: ');
  }, [isSliding]);

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

        <div className={styles.imgArrowsWrap}>
          <button
            onClick={() => {
              next(
                currentImageIndex === 0
                  ? images.length - 1
                  : currentImageIndex - 1
              );
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            onClick={() => {
              next(
                currentImageIndex === images.length - 1
                  ? 0
                  : currentImageIndex + 1
              );
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};
