import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import './search.scss';

const propTypes = {
  searchText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
};

const Search = ({ searchText, onChange, onSubmit }) => (
  <div className="search">
    <form className="search__form" onSubmit={onSubmit}>
      <input
        className="search__input"
        type="text"
        value={searchText}
        onChange={onChange}
        placeholder="Type keywords to find video"
      />
      <Button className="search__btn" type="submit" color="grey">
        Find
      </Button>
    </form>
  </div>
);

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
