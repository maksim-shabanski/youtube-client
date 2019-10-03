import React, { Component } from 'react';
import Search from 'components/Search';
import Alert from 'components/Alert';
import Spinner from 'components/Spinner';
import Slider from 'components/Slider';
import YouTubeAPI from 'services/youtubeAPI';
import { ANIMATION_DURATION } from 'utilities/constants';
import './app.scss';

const youTubeAPI = new YouTubeAPI();
   
class App extends Component {
  state = {
    searchText: '',
    alert: {
      text: 'You haven\'t searched anything yet.',
      type: '',
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

  handleResizeWindow = () => {
    const { totalCardsOnSlide, numberFirstCardOnSelectedSlide } = this.state;
    const newTotalCardsOnSlide = this.getTotalCardsOnSlide();

    if (totalCardsOnSlide === newTotalCardsOnSlide) {
      return false;
    }

    const selectedSlide = Math.ceil(numberFirstCardOnSelectedSlide / newTotalCardsOnSlide);

    this.setState({
      selectedSlide,
      totalCardsOnSlide: newTotalCardsOnSlide,
    });
  }

  handleSearchTextChange = ({ target: { value } }) => {
    this.setState({
      searchText: value,
    });
  }

  handleSubmitForm = (e) => {
    e.preventDefault();

    const { searchText } = this.state;

    if (searchText === '') {
      return false;
    }

    this.setState({
      selectedSlide: 1,
      videosData: [],
      nextPageToken: '',
      alert: {
        text: '',
        type: '',
      },
      isLoading: true, 
    }, () => {
      this.getVideosData();
    });
  }

  handleControlBtnClick = (e) => {
    const { direction } = e.target.dataset;

    if (!this.canChangeSlide(direction)) {
      return false;
    }

    this.handleSlideChange(direction);
  }

  handleMouseDown = (e) => {
    const { clientX: startPointX } = e;
    this.handleSwipeStart(startPointX);
  }

  handleTouchStart = (e) => {
    const { clientX: startPointX } = e.touches[0];
    this.handleSwipeStart(startPointX);
  }

  handleMouseMove = (e) => {
    const { clientX: endPointX } = e;
    this.handleSwipeMove(endPointX);
  }

  handleTouchMove = (e) => {
    const { clientX: endPointX } = e.touches[0];
    this.handleSwipeMove(endPointX);
  }

  handleSwipeStart = (startPointX) => {
    this.updateMousePointsState(startPointX, null);
  }

  handleSwipeMove = (endPointX) => {
    const { mousePointsX } = this.state;
    const { start: startPointX } = mousePointsX;
 
    if (!startPointX) {
      return false;
    }

    this.updateMousePointsState(startPointX, endPointX);
  }

  handleSwipeEnd = () => {
    const swipeDirection = this.getSwipeDirection();

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

    this.handleSlideChange(direction);
    this.updateMousePointsState(null, null);
  }

  handleSlideChange = (direction) => {
    const { totalCardsOnSlide } = this.state;
    let { selectedSlide, numberFirstCardOnSelectedSlide } = this.state;

    if (direction === 'next') {
      selectedSlide += 1;
    } else {
      selectedSlide -= 1;
    }

    numberFirstCardOnSelectedSlide += totalCardsOnSlide;
    
    this.setState({
      selectedSlide,
      numberFirstCardOnSelectedSlide,
      isSliderAnimated: true,
    }, () => {
      if (this.isNeedToLoadCards()) {
        this.getVideosData();
      }
      this.updateSliderAnimatedState();
    });
  }

  getTotalSlides() {
    const { videosData, totalCardsOnSlide } = this.state;
    return Math.ceil(videosData.length / totalCardsOnSlide);
  }

  getTotalCardsOnSlide() {
    const { innerWidth } = window;
    let totalCardsOnSlide = 0;

    if (innerWidth >= 1280) {
      totalCardsOnSlide = 4;
    } else if (innerWidth >= 940 && innerWidth < 1280) {
      totalCardsOnSlide = 3;
    } else if (innerWidth >= 640 && innerWidth < 940) {
      totalCardsOnSlide = 2;
    } else {
      totalCardsOnSlide = 1;
    }

    return totalCardsOnSlide;
  }

  getSwipeDirection() {
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

  getVideosData = async () => {
    try {
      const id = await this.getVideosId();
      const { items: videosData } = await youTubeAPI.fetchVideosData(id);

      if (videosData.length === 0) {
        this.updateAlertState({
          type: 'warning',
          text: 'We are so sorry! We couldn\'t find any video for your request.',
        });
      } else {
        this.updateVideosDataState(videosData);
      }
    } catch(error) {
      // TODO: don't show error when we created a slider and other videos don't download
      this.updateAlertState({
        type: 'warning',
        text: 'Something was wrong! Check your network connection and try searching again.',
      });
    }
  }

  getVideosId = async () => {
    const { searchText, nextPageToken: pageToken, maxVideoResults } = this.state;
    const data = await youTubeAPI.fetchVideosId(searchText, pageToken, maxVideoResults);
    const { nextPageToken, items } = data;
    const id = items.map(
      ({ id: { videoId } }) => videoId
    );

    this.setState({ nextPageToken });
    return id;
  }

  updateSliderAnimatedState = () => {
    const { isSliderAnimated } = this.state;
    
    window.setTimeout(() => {
      this.setState({
        isSliderAnimated: !isSliderAnimated,
      });
    }, ANIMATION_DURATION);
  }

  updateAlertState = (alert) => {
    this.setState({
      alert,
      isLoading: false,
    })
  }

  updateVideosDataState = (nextVideosData) => {
    const { videosData } = this.state;
    this.setState({
      isLoading: false,
      videosData: videosData.concat(nextVideosData)
    });
  }

  updateMousePointsState = (startPointX, endPointX) => {
    this.setState({
      mousePointsX: {
        start: startPointX,
        end: endPointX,
      },
    });
  }

  canChangeSlide = (direction) => {
    const { selectedSlide, isSliderAnimated } = this.state;
    const totalSlides = this.getTotalSlides();

    if (isSliderAnimated) {
      return false;
    }

    if (direction === 'prev' && selectedSlide === 1) {
      return false;
    }

    if (direction === 'next' && totalSlides === selectedSlide) {
      return false;
    }

    return true;
  }

  isNeedToLoadCards = () => {
    const { selectedSlide } = this.state;
    const totalSlides = this.getTotalSlides();
    
    if (selectedSlide >= totalSlides - 3) {
      return true;
    }

    return false;
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
            onMouseUp={this.handleSwipeEnd}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleSwipeEnd}
          />
        }
        {alert.text && <Alert options={alert} />}
        {isLoading && <Spinner variant="circle" />}
      </main>
    );
  }
}

export default App;
