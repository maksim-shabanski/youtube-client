import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const Button = ({ variant, children }) => {
  const btnVariant = variant ? `btn--${variant}` : '';
  return <button className={`btn ${btnVariant}`.trim()}>{children}</button>;
};

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultTypes = {
  variant: '',
  children: '',
};

export default Button;
