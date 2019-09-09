import React from 'react';
import PropTypes from 'prop-types';
import './alert.scss';

const Alert = ({ variant, alertText }) => {
  const alertVariant = variant ? `alert--${variant}` : '';
  return (
    <div className={`alert ${alertVariant}`.trim()}>
      {alertText}
    </div>
  );
};

Alert.propTypes = {
  alertText: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

Alert.defaultProp = {
  variant: '',
};

export default Alert;
