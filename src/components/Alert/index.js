import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './alert.scss';

const propTypes = {
  children: PropTypes.string.isRequired,
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(['warning', null]),
};

const defaultProps = {
  as: 'div',
  variant: null,
};

const Alert = ({ as: Component, variant, children }) => {
  const prefix = 'alert';
  const classes = classNames(prefix, variant && `${prefix}--${variant}`);
  return <Component className={classes}>{children}</Component>;
};

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
Alert.displayName = 'Alert';

export default Alert;
