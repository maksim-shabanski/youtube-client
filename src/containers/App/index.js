import React, { Component } from 'react';
import Search from 'components/Search';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import Slider from 'components/Slider';
import YouTubeAPI from 'services/youtubeAPI';
import { ANIMATION_DURATION } from 'utilities/constants';
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
    totalCardsOnSlide: this.getTotalCardsOnSlide(),
    numberFirstCardOnSelectedSlide: 1,
    isSliderAnimated: false,
    mousePointsX: {
      start: null,
      end: null,
    },
    videosData: [],
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeWindow);
  }

  handleResizeWindow = (e) => {
    const { totalCardsOnSlide, numberFirstCardOnSelectedSlide } = this.state;
    const { innerWidth: pageWidth } = e.currentTarget;
    const newTotalCardsOnSlide = this.computeTotalCardsOnSlide(pageWidth);

    if (totalCardsOnSlide === newTotalCardsOnSlide) {
      return false;
    }

    const selectedSlide = Math.ceil(numberFirstCardOnSelectedSlide / newTotalCardsOnSlide);

    this.setState({
      selectedSlide,
      totalCardsOnSlide: newTotalCardsOnSlide,
    });
  }

  getTotalCardsOnSlide() {
    const { innerWidth: pageWidth } = window;
    const totalCardsOnSlide = this.computeTotalCardsOnSlide(pageWidth);
    return totalCardsOnSlide;
  }

  computeTotalCardsOnSlide(pageWidth) {
    let totalCardsOnSlide = 0;

    if (pageWidth >= 1280) {
      totalCardsOnSlide = 4;
    } else if (pageWidth >= 940 && pageWidth < 1280) {
      totalCardsOnSlide = 3;
    } else if (pageWidth >= 640 && pageWidth < 940) {
      totalCardsOnSlide = 2;
    } else {
      totalCardsOnSlide = 1;
    }

    return totalCardsOnSlide;
  } 

  turnAnimatedOff = () => {
    setTimeout(() => {
      this.setState({ isSliderAnimated: false });
    }, ANIMATION_DURATION);
  }

  changeSlide = (direction) => {
    const { totalCardsOnSlide } = this.state;
    let { selectedSlide } = this.state;

    if (direction === 'next') {
      selectedSlide += 1;
    } else {
      selectedSlide -= 1;
    }

    const numberFirstCardOnSelectedSlide = totalCardsOnSlide * (selectedSlide - 1) + 1;
    
    this.setState({
      selectedSlide,
      numberFirstCardOnSelectedSlide,
      isSliderAnimated: true,
    }, () => {
      if (this.isNeedToLoadCards()) {
        this.getVideosData();
      }
    });

    this.turnAnimatedOff();
  }

  isNeedToLoadCards = () => {
    const { selectedSlide, videosData, totalCardsOnSlide } = this.state;
    const numberCards = videosData.length;
    const numberSlides = numberCards / totalCardsOnSlide;

    // TODO: need to consider a case when we reached the last slide and prohibit switch a slide ahead
    
    if (selectedSlide >= numberSlides - 3) {
      return true;
    }

    return false;
  }

  handleControlBtnClick = (e) => {
    const { direction } = e.target.dataset;

    if (!this.canChangeSlide(direction)) {
      return false;
    }

    this.changeSlide(direction);
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
      return false;
    }

    if (lastSearchText === searchText) {
      return false;
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

  setAlertOption = (text) => {
    this.setState({
      alert: {
        text,
        variant: 'warning',
      },
      isLoading: false,
    })
  }

  setNextPageToken = (nextPageToken) => {
    this.setState({ nextPageToken });
  }

  setVideosData = (nextVideosData) => {
    const { videosData } = this.state;
    this.setState({
      isLoading: false,
      videosData: videosData.concat(nextVideosData)
    });
  }

  setMousePointsX = (startPointX, endPointX) => {
    this.setState({
      mousePointsX: {
        start: startPointX,
        end: endPointX,
      },
    });
  }

  determineSwipeDirection = () => {
    const { mousePointsX } = this.state;
    const { start: startPointX, end: endPointX } = mousePointsX;

    if (!startPointX || !endPointX) {
      return false;
    }

    const diff = startPointX - endPointX;

    if (diff === 0) {
      return false;
    }

    let direction = 'left';

    if (diff < 0) {
      direction = 'right'
    }

    return direction;
  }

  canChangeSlide = (direction) => {
    const { selectedSlide, isSliderAnimated } = this.state;

    if (isSliderAnimated) {
      return false;
    }

    if (direction === 'prev' && selectedSlide === 1) {
      return false;
    }

    return true;
  }

  swipeStart = (startPointX) => {
    this.setMousePointsX(startPointX, null);
  }

  swipeMove = (endPointX) => {
    const { mousePointsX } = this.state;
    const { start: startPointX } = mousePointsX;
 
    if (!startPointX) {
      return false;
    }

    this.setMousePointsX(startPointX, endPointX);
  }

  swipeEnd = () => {
    const swipeDirection = this.determineSwipeDirection();

    if (!swipeDirection) {
      return false;
    }

    let direction = 'next';

    if (swipeDirection === 'right') {
      direction = 'prev';
    }

    if (!this.canChangeSlide(direction)) {
      return false;
    }

    this.changeSlide(direction);
    this.setMousePointsX(null, null);
  }

  handleMouseDown = (e) => {
    const { clientX: startPointX } = e;
    this.swipeStart(startPointX);
  }

  handleTouchStart = (e) => {
    const { clientX: startPointX } = e.touches[0];
    this.swipeStart(startPointX);
  }

  handleMouseMove = (e) => {
    const { clientX: endPointX } = e;
    this.swipeMove(endPointX);
  }

  handleTouchMove = (e) => {
    const { clientX: endPointX } = e.touches[0];
    this.swipeMove(endPointX);
  }

  render() {
    const {
      searchText,
      alert,
      isLoading,
      videosData,
      selectedSlide,
      totalCardsOnSlide,
    } = this.state;
    const {text: alertText, variant: alertVariant } = alert;

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
            totalCardsOnSlide={totalCardsOnSlide}
            onClick={this.handleControlBtnClick}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.swipeEnd}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.swipeEnd}
          />
        }
        {alertText && <Alert text={alertText} variant={alertVariant} />}
        {isLoading && <Loader />}
      </main>
    );
  }
}

export default App;
