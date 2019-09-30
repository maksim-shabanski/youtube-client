import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const Button = ({ type, children }) => {
  const variant = type ? `btn--${type}` : '';
  return <button className={`btn ${variant}`.trim()}>{children}</button>;
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultTypes = {
  type: '',
  children: '',
};

export default Button;
