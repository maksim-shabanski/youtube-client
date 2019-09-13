import React, { Component } from 'react';
import Card from '../../components/Card';
import './slider.scss';

const CARD_WIDTH = 310;
const TOTAL_CARDS_ON_SLIDES = 4;
const ANIMATION_DURATION = 500;

class Slider extends Component {
  state = {
    activePage: 1,
    isAnimated: false,
  }

  handleBtnClick = (e) => {
    const { btn } = e.target.dataset;
    let { activePage, isAnimated } = this.state;

    if (isAnimated) {
      return null;
    }
  
    if (btn === 'next') {
      activePage += 1;
    } else {
      activePage -= 1;
    }
    
    this.setState({
      activePage,
      isAnimated: true,
    });

    this.turnOffAnimation();
  }

  turnOffAnimation() {
    setTimeout(() => {
      this.setState({ isAnimated: false });
    }, ANIMATION_DURATION);
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
    const disabledPrevBtn = activePage === 1 ? true : false;
    const disabledNextBtn = videosData.length < TOTAL_CARDS_ON_SLIDES ? true : false;

    return (
      <div className="slider">
        <div className="slider__track" style={sliderTrackStyles}>
          {videosData.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
        <div className="slider__controls">
          <button
            data-btn="prev"
            className="slider__btn"
            disabled={disabledPrevBtn}
            onClick={this.handleBtnClick}
          >
            Prev
          </button>
          <span className="slider__current-page">{activePage}</span>
          <button
            data-btn="next"
            className="slider__btn"
            disabled={disabledNextBtn}
            onClick={this.handleBtnClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Slider;
