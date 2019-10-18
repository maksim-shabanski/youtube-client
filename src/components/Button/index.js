import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.scss';

const propTypes = {
  as: PropTypes.elementType,
  type: PropTypes.oneOf(['button', 'submit', 'reset', null]),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', null]),
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

const defaultProps = {
  as: 'button',
  type: null,
  className: null,
  variant: null,
  color: 'primary',
  disabled: false,
};

const Button = ({
  as: Component,
  className,
  variant,
  color,
  disabled,
  ...props
}) => {
  const prefix = 'btn';
  const modifierColor = variant ? `${variant}-${color}` : color;
  const classes = classNames(className, prefix, `${prefix}--${modifierColor}`);

  if (disabled) {
    props.disabled = disabled;
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <Component className={classes} {...props} />
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.displayName = 'Button';

export default Button;
