import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './spinner.scss';

const propTypes = {
  variant: PropTypes.string.isRequired,
  as: PropTypes.elementType,
};

const defaultProps = {
  as: 'div',
};

const Spinner = ({ as: Component, variant }) => {
  const prefix = 'spinner';
  const elemClass = `${prefix}__figure`;
  const classes = classNames(elemClass, `${elemClass}--${variant}`);

  let body = <span className={classes} />;

  if (variant === 'bounce') {
    body = (
      <>
        <span className={classes} />
        <span className={classes} />
        <span className={classes} />
      </>
    );
  }

  return <Component className={prefix}>{body}</Component>;
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
Spinner.displayName = 'Spinner';

export default Spinner;
