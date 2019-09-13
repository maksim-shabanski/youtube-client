import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

const Card = ({ data }) => {
  const { url, image, channelUrl, channelName, title, date, description, viewCount } = data;
  const readableDate = new Date(date).toDateString().slice(4);

  return (
    <div className="card">
      <div className="card__thumbnail">
        <a href={url}>
          <img className="card__img" src={image} alt="" />
        </a>
      </div>
      <div className="card__content">
        <div className="card__details">
          <header className="card__heading">
            <span className="card__author">
              Channel by <a href={channelUrl}>{channelName}</a>
            </span>
            <h2 className="card__title">
              <a href={url}>{title}</a>
            </h2>
          </header>
          <p className="card__desc">
            <time className="card__date" dateTime={date}>
              {readableDate}
            </time> <br />
            {description}
          </p>
        </div>
        <footer className="card__footer">
          <a className="btn" href={url}>See video</a>
          <span className="card__views">{viewCount} views</span>
        </footer>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string,
    image: PropTypes.string,
    channelUrl: PropTypes.string,
    channelName: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    viewCount: PropTypes.number,
  }).isRequired,
};

export default Card;
