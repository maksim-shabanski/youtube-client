import React from 'react';
import PropTypes from 'prop-types';
import './alert.scss';

const Alert = ({ variant, text }) => {
  const alertVariant = variant ? `alert--${variant}` : '';
  return (
    <div className={`alert ${alertVariant}`.trim()}>
      {text}
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

Alert.defaultProp = {
  variant: '',
};

export default Alert;
