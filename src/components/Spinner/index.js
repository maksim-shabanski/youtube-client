import React from 'react';
import PropTypes from 'prop-types';
import './spinner.scss';

const propTypes = {
  variant: PropTypes.string.isRequired,
  as: PropTypes.elementType,
}

const defaultProps = {
  as: 'div',
}

const Spinner = ({ variant, as: Component }) => {
  const prefix = 'spinner';
  const figureClass = `${prefix}__figure`;
  const figureClassWithModifier = `${figureClass} ${figureClass}--${variant}`;

  let bodySpinner = <span className={`${figureClassWithModifier}`} />;

  if (variant === 'bounce') {
    bodySpinner =  (
      <>
        <span className={`${figureClassWithModifier} ${figureClass}--delay32`} />
        <span className={`${figureClassWithModifier} ${figureClass}--delay16`} />
        <span className={`${figureClassWithModifier}`} />
      </>
    );
  }
  
  return <Component className={prefix}>{bodySpinner}</Component>;
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
Spinner.displayName = 'Spinner';

export default Spinner;
