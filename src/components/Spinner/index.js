import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './spinner.scss';

const spinnerItemsConfig = {
  bounce: [
    {
      id: 1,
      modifierClass: 'delay32',
    },
    {
      id: 2,
      modifierClass: 'delay16',
    },
    {
      id: 3,
      modifierClass: null,
    },
  ],
  circle: [
    {
      id: 1,
      modifierClass: null,
    },
  ],
};

const propTypes = {
  variant: PropTypes.oneOf(['circle', 'bounce']).isRequired,
  as: PropTypes.elementType,
};

const defaultProps = {
  as: 'div',
};

const Spinner = ({ as: Component, variant }) => {
  const blockClass = 'spinner';
  const elemClass = `${blockClass}__figure`;
  const spinnerItems = spinnerItemsConfig[variant];
  const body = spinnerItems.map(({ id, modifierClass }) => {
    return (
      <span
        key={id}
        className={classNames(
          elemClass,
          `${elemClass}--${variant}`,
          modifierClass && `${elemClass}--${modifierClass}`
        )}
      />
    );
  });

  return <Component className={blockClass}>{body}</Component>;
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
Spinner.displayName = 'Spinner';

export default Spinner;
