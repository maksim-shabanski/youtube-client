import React from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';
import Card from 'components/Card';
import Button from 'components/Button';
import { CARD_WIDTH } from 'utilities/constants';
import './slider.scss';

const propTypes = {
  videosDataMap: PropTypes.instanceOf(Map).isRequired,
  selectedSlide: PropTypes.number,
  totalSlides: PropTypes.number,
  totalCardsOnSlide: PropTypes.number,
  isExistMoreSlides: PropTypes.bool,
  onControlClick: PropTypes.func,
};

const defaultProps = {
  selectedSlide: 1,
  totalSlides: 1,
  totalCardsOnSlide: 1,
  isExistMoreSlides: true,
  onControlClick: () => {},
};

const Slider = React.forwardRef((props, ref) => {
  const {
    videosDataMap,
    selectedSlide,
    totalSlides,
    isExistMoreSlides,
    totalCardsOnSlide,
    onControlClick,
    ...mouseEventsProps
  } = props;
  const videoCards = [];
  const sliderTrackWidth = videosDataMap.size * CARD_WIDTH;
  const sliderTrackPosition =
    (selectedSlide - 1) * CARD_WIDTH * totalCardsOnSlide;

  const sliderTrackStyles = {
    width: `${sliderTrackWidth}px`,
    transform: `translate3d(-${sliderTrackPosition}px, 0, 0)`,
  };

  const isDisabledPrevBtn = selectedSlide === 1;
  const isDisabledNextBtn = selectedSlide === totalSlides;

  let nextBtnCaption = 'Next';

  if (isExistMoreSlides && selectedSlide === totalSlides) {
    nextBtnCaption = <Spinner variant="bounce" as="span" />;
  }

  videosDataMap.forEach((videoData, videoHash) => {
    // eslint-disable-next-line react/no-array-index-key
    const card = <Card key={videoHash} videoData={videoData} />;
    videoCards.push(card);
  });

  return (
    <div className="slider">
      <div className="slider__content" {...mouseEventsProps}>
        <div ref={ref} className="slider__track" style={sliderTrackStyles}>
          {videoCards}
        </div>
      </div>
      <div className="slider__controls">
        <Button
          type="button"
          className="slider__btn"
          color="grey"
          data-direction="prev"
          disabled={isDisabledPrevBtn}
          onClick={onControlClick}
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
          onClick={onControlClick}
        >
          {nextBtnCaption}
        </Button>
      </div>
    </div>
  );
});

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
