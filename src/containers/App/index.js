import React, { Component } from 'react';
import Search from '../../components/Search';
import Alert from '../../components/Alert'
import './app.scss';

class App extends Component {
  state = {
    searchText: '',
    alertText: 'You haven\'t searched anything yet.',
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
    const { searchText, alertText } = this.state;

    return (
      <main className="wrapper">
        <Search
          searchText={searchText}
          onChange={this.handleSearchTextChange}
          onSubmit={this.handleSubmitForm}
        />
        {alertText && <Alert alertText={alertText} />}
      </main>
    );
  }
}

export default App;
