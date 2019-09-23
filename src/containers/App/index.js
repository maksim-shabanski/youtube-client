import React, { Component } from 'react';
import Search from '../../components/Search';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import Slider from '../../components/Slider';
import YouTubeAPI from '../../services/youtubeAPI';
import { ANIMATION_DURATION, TOTAL_CARDS_ON_SLIDES } from '../../utilities/constants';
import './app.scss';

const youTubeAPI = new YouTubeAPI();
   
class App extends Component {
  state = {
    history: [],
    searchText: '',
    alert: {
      text: 'You haven\'t searched anything yet.',
      variant: '',
    },
    isLoading: false,
    maxVideoResults: 16,
    nextPageToken: '',
    selectedSlide: 1,
    isAnimated: false,
    videosData: [],
  }

  turnAnimatedOff() {
    setTimeout(() => {
      this.setState({ isAnimated: false });
    }, ANIMATION_DURATION);
  }

  changeSlide(btn) {
    let { selectedSlide } = this.state;

    if (btn === 'next') {
      selectedSlide += 1;
    } else {
      selectedSlide -= 1;
    }
    
    this.setState({
      selectedSlide,
      isAnimated: true,
    }, () => {
      if (this.isNeedToLoadCards()) {
        this.getVideosData();
      }
    });

    this.turnAnimatedOff();
  }

  isNeedToLoadCards() {
    const { selectedSlide, videosData } = this.state;
    const numberCards = videosData.length;
    const numberSlides = numberCards / TOTAL_CARDS_ON_SLIDES;

    // TODO: need to consider a case when we reached the last slide and prohibit switch a slide ahead
    
    if (selectedSlide >= numberSlides - 3) {
      return true;
    }

    return false;
  }

  handleSliderBtnClick = (e) => {
    const { btn } = e.target.dataset;
    const { isAnimated } = this.state;

    if (isAnimated) {
      return null;
    }

    this.changeSlide(btn);
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
      selectedSlide: 1,
      videosData: [],
      alert: {
        text: '',
        variant: '',
      },
      isLoading: true, 
    });

    this.getVideosData();
  }

  async getVideosData() {
    try {
      const id = await this.getVideosId();
      const { items: videosData } = await youTubeAPI.fetchVideosData(id);

      if (videosData.length === 0) {
        const alertText = 'We are so sorry! We couldn\'t find any video for your request.';
        this.setAlertOption(alertText);
      } else {
        this.setVideosData(videosData);
      }
    } catch(error) {
      // TODO: don't show error when we created a slider and other videos don't download
      const alertText = 'Something was wrong! Check your network connection and try searching again.';
      this.setAlertOption(alertText);
    }
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

  setAlertOption(text) {
    this.setState({
      alert: {
        text,
        variant: 'warning',
      },
      isLoading: false,
    })
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
    const {
      searchText,
      alert,
      isLoading,
      videosData,
      selectedSlide,
    } = this.state;
    const { text: alertText, variant: alertVariant } = alert;

    return (
      <main className="wrapper">
        <Search
          searchText={searchText}
          onChange={this.handleSearchTextChange}
          onSubmit={this.handleSubmitForm}
        />
        {videosData.length !== 0 && 
          <Slider 
            videosData={videosData}
            selectedSlide={selectedSlide}
            onClick={this.handleSliderBtnClick}
          />
        }
        {alertText && <Alert text={alertText} variant={alertVariant} />}
        {isLoading && <Loader />}
      </main>
    );
  }
}

export default App;
