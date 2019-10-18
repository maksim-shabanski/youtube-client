import React from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';
import Card from 'components/Card';
import Button from 'components/Button';
import { ANIMATION_DURATION, CARD_WIDTH } from 'utilities/constants';
import './slider.scss';

const propTypes = {
  videosData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedSlide: PropTypes.number,
  totalSlides: PropTypes.number,
  totalCardsOnSlide: PropTypes.number,
  isExistMoreSlides: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
};

const defaultProps = {
  selectedSlide: 1,
  totalSlides: 1,
  totalCardsOnSlide: 1,
  isExistMoreSlides: true,
  onClick: () => {},
  onMouseDown: () => {},
  onMouseMove: () => {},
  onMouseUp: () => {},
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
};

const Slider = ({
  videosData,
  selectedSlide,
  totalSlides,
  isExistMoreSlides,
  totalCardsOnSlide,
  onClick,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  const sliderWidth = videosData.length * CARD_WIDTH;
  const scrollPos = (selectedSlide - 1) * CARD_WIDTH * totalCardsOnSlide;
  const sliderTrackStyles = {
    width: `${sliderWidth}px`,
    transition: `transform ${ANIMATION_DURATION}ms ease-in-out 0s`,
    transform: `translate3d(-${scrollPos}px, 0, 0)`,
  };
  const isDisabledPrevBtn = selectedSlide === 1;
  const isDisabledNextBtn = selectedSlide === totalSlides;

  let nextBtnCaption = 'Next';
  if (isExistMoreSlides && selectedSlide === totalSlides) {
    nextBtnCaption = <Spinner variant="bounce" as="span" />;
  }

  return (
    <div className="slider">
      <div
        role="presentation"
        className="slider__track"
        style={sliderTrackStyles}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {videosData.map(videoData => (
          <Card key={videoData.id} videoData={videoData} />
        ))}
      </div>
      <div className="slider__controls">
        <Button
          type="button"
          className="slider__btn"
          color="grey"
          data-direction="prev"
          disabled={isDisabledPrevBtn}
          onClick={onClick}
        >
          Prev
        </Button>
        <span className="slider__current-page">{selectedSlide}</span>
        <Button
          type="button"
          className="slider__btn"
          color="grey"
          data-direction="next"
          disabled={isDisabledNextBtn}
          onClick={onClick}
        >
          {nextBtnCaption}
        </Button>
      </div>
    </div>
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
