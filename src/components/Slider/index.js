import React from 'react';
import Spinner from 'components/Spinner';
import Card from 'components/Card';
import { ANIMATION_DURATION, CARD_WIDTH } from 'utilities/constants';
import './slider.scss';

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
    transform: `translate3d(-${scrollPos}px, 0px, 0px)`,
  };
  const isDisabledPrevBtn = selectedSlide === 1 ? true : false;
  const isDisabledNextBtn = selectedSlide === totalSlides ? true : false;

  let nextBtnCaption = 'Next';
  if (isExistMoreSlides && selectedSlide === totalSlides ) {
    nextBtnCaption = <Spinner variant="bounce" as="span" />;
  }

  return (
    <div className="slider">
      <div 
        className="slider__track" style={sliderTrackStyles}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {videosData.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>
      <div className="slider__controls">
        <button
          data-direction="prev"
          className="slider__btn"
          disabled={isDisabledPrevBtn}
          onClick={onClick}
        >
          Prev
        </button>
        <span className="slider__current-page">{selectedSlide}</span>
        <button
          data-direction="next"
          className="slider__btn"
          disabled={isDisabledNextBtn}
          onClick={onClick}
        >
          {nextBtnCaption}
        </button>
      </div>
    </div>
  );
}

export default Slider;
