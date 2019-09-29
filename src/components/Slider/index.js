import React from 'react';
import Card from 'components/Card';
import { ANIMATION_DURATION, CARD_WIDTH } from 'utilities/constants';
import './slider.scss';

const Slider = ({ videosData, selectedSlide, totalCardsOnSlide, onClick, onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd }) => {

  if (videosData.length === 0) {
    return null;
  }

  const sliderWidth = videosData.length * CARD_WIDTH;
  const scrollPos = (selectedSlide - 1) * CARD_WIDTH * totalCardsOnSlide;
  const sliderTrackStyles = {
    width: `${sliderWidth}px`,
    transition: `transform ${ANIMATION_DURATION}ms ease-in-out 0s`,
    transform: `translate3d(-${scrollPos}px, 0px, 0px)`,
  };
  const disabledPrevBtn = selectedSlide === 1 ? true : false;
  const disabledNextBtn = videosData.length < totalCardsOnSlide ? true : false;

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
          disabled={disabledPrevBtn}
          onClick={onClick}
        >
          Prev
        </button>
        <span className="slider__current-page">{selectedSlide}</span>
        <button
          data-direction="next"
          className="slider__btn"
          disabled={disabledNextBtn}
          onClick={onClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Slider;
