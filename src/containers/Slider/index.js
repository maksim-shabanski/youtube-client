import React, { Component } from 'react';
import Card from '../../components/Card';
import './slider.scss';

const CARD_WIDTH = 310;
const TOTAL_CARDS_ON_SLIDES = 4;
const ANIMATION_DURATION = 500;

class Slider extends Component {
  state = {
    activePage: 1,
  }

  render() {
    const { videosData } = this.props;
    const { activePage } = this.state;

    if (videosData.length === 0) {
      return null;
    }

    const sliderWidth = videosData.length * CARD_WIDTH;
    const scrollPos = (activePage - 1) * CARD_WIDTH * TOTAL_CARDS_ON_SLIDES;
    const sliderTrackStyles = {
      width: `${sliderWidth}px`,
      transition: `transform ${ANIMATION_DURATION}ms ease-in-out 0s`,
      transform: `translate3d(-${scrollPos}px, 0px, 0px)`,
    };

    return (
      <div className="slider">
        <div className="slider__track" style={sliderTrackStyles}>
          {videosData.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
        <div className="slider__controls">
          <button className="slider__btn" disabled>Prev</button>
          <span className="slider__current-page">{activePage}</span>
          <button className="slider__btn" disabled>Next</button>
        </div>
      </div>
    );
  }
}

export default Slider;
