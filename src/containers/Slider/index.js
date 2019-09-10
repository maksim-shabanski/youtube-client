import React, { Component } from 'react';
import Card from '../../components/Card';
import { mock } from './mock';
import './slider.scss';

class Slider extends Component {
  render() {
    return (
      <div className="slider">
        <div className="slider__track">
          {mock.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
        <div className="slider__controls">
          <button className="slider__btn" disabled>Prev</button>
          <span className="slider__current-page">1 of 10</span>
          <button className="slider__btn" disabled>Next</button>
        </div>
      </div>
    );
  }
}

export default Slider;
