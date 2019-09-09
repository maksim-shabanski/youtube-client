import React, { Component } from 'react';
import Search from '../../components/Search';
import './app.scss';

class App extends Component {
  state = {
    searchText: '',
    data: [],
  }

  handleSearchTextChange = ({ target: { value } }) => {
    this.setState({
      searchText: value,
    });
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    // todo: write method to get data from youtube api
  }

  render() {
    const { searchText } = this.state;

    return (
      <main className="wrapper">
        <Search
          searchText={searchText}
          onChange={this.handleSearchTextChange}
          onSubmit={this.handleSubmitForm}
        />
      </main>
    );
  }
}

export default App;
