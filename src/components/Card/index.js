import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import shrinkNumber from 'utilities/shrinkNumber';
import './card.scss';

dayjs.extend(relativeTime);

const VIDEO_PATH = 'https://www.youtube.com/watch?v=';
const CHANNEL_PATH = 'https://www.youtube.com/channel/';

const propTypes = {
  videoData: PropTypes.shape({
    id: PropTypes.string,
    snippet: PropTypes.shape({
      channelId: PropTypes.string,
      channelTitle: PropTypes.string,
      publishedAt: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      thumbnails: PropTypes.shape({
        high: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
    statistics: PropTypes.shape({
      viewCount: PropTypes.string,
    }),
  }).isRequired,
};

const Card = ({ videoData }) => {
  const { id, snippet, statistics } = videoData;
  const {
    channelId,
    channelTitle,
    publishedAt,
    title,
    description,
    thumbnails,
  } = snippet;
  const {
    high: { url: imageUrl },
  } = thumbnails;
  const { viewCount } = statistics;
  const oneLineDesc = description.replace(/[\n\t]/g, '');

  return (
    <div className="card">
      <div className="card__thumbnail">
        <a href={`${VIDEO_PATH}${id}`}>
          <img className="card__img" src={imageUrl} alt="" />
        </a>
      </div>
      <div className="card__body">
        <div className="card__author">
          <a href={`${CHANNEL_PATH}${channelId}`} className="card__author-link">
            {channelTitle}
          </a>
        </div>
        <h2 className="card__title">
          <a
            href={`${VIDEO_PATH}${id}`}
            className="card__title-link"
            title={title}
          >
            {title}
          </a>
        </h2>
        <div className="card__metadata">
          <span className="card__views">{shrinkNumber(viewCount)} views</span>
          <time className="card__date" dateTime={publishedAt}>
            {dayjs().to(publishedAt)}
          </time>
        </div>
        <div className="card__desc">
          <p>{oneLineDesc || 'No description'}</p>
        </div>
        <a className="btn" href={`${VIDEO_PATH}${id}`}>
          Watch video
        </a>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
