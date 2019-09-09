import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './search.scss';

const Search = ({ searchText, onChange, onSubmit }) => (
  <div className="search">
    <form className="search__form" onSubmit={onSubmit}>
      <input
        className="search__input"
        type="text"
        value={searchText}
        onChange={onChange}
        placeholder="Type keywords to find video"
        autoFocus
      />
      <Button variant="grey">Find</Button>
    </form>
  </div>
);

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

Search.defaultProp = {
  searchText: '',
  onChange: () => {},
  onSubmit: () => {},
};

export default Search;
