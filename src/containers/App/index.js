import React, { Component } from 'react';
import Search from '../../components/Search';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import Slider from '../Slider';
import YouTubeAPI from '../../services/youtubeAPI';
import './app.scss';

const youTubeAPI = new YouTubeAPI();
   
class App extends Component {
  state = {
    history: [],
    searchText: '',
    alertText: 'You haven\'t searched anything yet.',
    isLoading: false,
    maxVideoResults: 16,
    nextPageToken: '',
    videosData: [],
  }

  handleSearchTextChange = ({ target: { value } }) => {
    this.setState({
      searchText: value,
    });
  }

  handleSubmitForm = (e) => {
    e.preventDefault();

    const { history, searchText } = this.state;
    const lastSearchText = history[history.length - 1] || '';

    if (searchText === '') {
      return null;
    }

    if (lastSearchText === searchText) {
      return null;
    }

    history.push(searchText);

    this.setState({
      history,
      videosData: [],
      alertText: '',
      isLoading: true, 
    });

    this.getVideosData();
  }

  async getVideosData() {
    const id = await this.getVideosId();
    const {items: videosData } = await youTubeAPI.fetchVideosData(id);
    this.setVideosData(videosData);
  }

  async getVideosId() {
    const { searchText, nextPageToken: pageToken, maxVideoResults } = this.state;
    const data = await youTubeAPI.fetchVideosId(searchText, pageToken, maxVideoResults);
    const { nextPageToken, items } = data;
    const id = items.map(
      ({ id: { videoId } }) => videoId
    );

    this.setNextPageToken(nextPageToken);
    return id;
  }

  setNextPageToken(nextPageToken) {
    this.setState({ nextPageToken });
  }

  setVideosData(nextVideosData) {
    const { videosData } = this.state;
    this.setState({
      isLoading: false,
      videosData: videosData.concat(nextVideosData)
    });
  }

  render() {
    const { videosData, searchText, alertText, isLoading } = this.state;

    return (
      <main className="wrapper">
        <Search
          searchText={searchText}
          onChange={this.handleSearchTextChange}
          onSubmit={this.handleSubmitForm}
        />
        <Slider videosData={videosData} />
        {alertText && <Alert alertText={alertText} />}
        {isLoading && <Loader />}
      </main>
    );
  }
}

export default App;
