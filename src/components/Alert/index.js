import React from 'react';
import PropTypes from 'prop-types';
import './alert.scss';

const Alert = ({ options }) => {
  const { type, text } = options;
  const variant = type ? `alert--${type}` : '';

  return (
    <div className={`alert ${variant}`.trim()}>
      {text}
    </div>
  );
};

Alert.propTypes = {
  options: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default Alert;
