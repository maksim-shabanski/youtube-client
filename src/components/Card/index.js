import React from 'react';
import PropTypes from 'prop-types';
import shrinkNumber from 'utilities/shrinkNumber';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './card.scss';

dayjs.extend(relativeTime);

const VIDEO_PATH = 'https://www.youtube.com/watch?v=';
const CHANNEL_PATH = 'https://www.youtube.com/channel/';

const Card = ({ data }) => {
  const { id, snippet, statistics } = data;
  const { channelId, channelTitle, publishedAt, title, description, thumbnails } = snippet;
  const { high: { url: imageUrl } } = thumbnails;
  const { viewCount } = statistics;

  return (
    <div className="card">
      <div className="card__thumbnail">
        <a href={`${VIDEO_PATH}${id}`}>
          <img className="card__img" src={imageUrl} alt="" />
        </a>
      </div>
      <div className="card__content">
        <div className="card__details">
          <header className="card__heading">
            <span className="card__author">
              Channel by <a href={`${CHANNEL_PATH}${channelId}`}>{channelTitle}</a>
            </span>
            <h2 className="card__title">
              <a href={`${VIDEO_PATH}${id}`}>
                {title}
              </a>
            </h2>
          </header>
          <p className="card__desc">
            <time className="card__date" dateTime={publishedAt}>
              {dayjs().to(publishedAt)}
            </time> <br />
            {description}
          </p>
        </div>
        <footer className="card__footer">
          <a className="btn" href={`${VIDEO_PATH}${id}`}>Watch video</a>
          <span className="card__views">{shrinkNumber(viewCount)} views</span>
        </footer>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Card;
