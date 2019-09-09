import React, { Component } from 'react';
import Search from '../../components/Search';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import './app.scss';

class App extends Component {
  state = {
    searchText: '',
    alertText: 'You haven\'t searched anything yet.',
    isLoading: false,
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
    const { searchText, alertText, isLoading } = this.state;

    return (
      <main className="wrapper">
        <Search
          searchText={searchText}
          onChange={this.handleSearchTextChange}
          onSubmit={this.handleSubmitForm}
        />
        {alertText && <Alert alertText={alertText} />}
        {isLoading && <Loader />}
      </main>
    );
  }
}

export default App;
