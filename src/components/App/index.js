import React, { Component } from 'react';

import Search from 'components/Search';
import Alert from 'components/Alert';
import Spinner from 'components/Spinner';
import Slider from 'components/Slider';
import youTubeAPI from 'services/youtubeAPI';
import { ANIMATION_DURATION, CARD_WIDTH } from 'utilities/constants';
import './app.scss';

class App extends Component {
  static getTotalCardsOnSlide() {
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

  static getDirection(startPoint, endPoint) {
    const dragDistance = startPoint - endPoint;

    if (dragDistance === 0) {
      return undefined;
    }

    let direction = 'next';

    if (dragDistance < 0) {
      direction = 'prev';
    }

    return direction;
  }

  state = {
    searchText: '',
    alert: {
      text: "You haven't searched anything yet.",
      variant: null,
    },
    isLoadingData: false,
    showSpinner: false,
    maxVideoResults: 24,
    pageToken: '',
    selectedSlide: 1,
    totalCardsOnSlide: App.getTotalCardsOnSlide(),
    numberFirstCardOnSelectedSlide: 1,
    isSliderAnimated: false,
    mouseStartPoint: null,
    videosDataMap: new Map(),
  };

  sliderTrack = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.handleResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeWindow);
  }

  getTotalSlides() {
    const { videosDataMap, totalCardsOnSlide } = this.state;
    return Math.ceil(videosDataMap.size / totalCardsOnSlide);
  }

  handleResizeWindow = () => {
    const { totalCardsOnSlide, numberFirstCardOnSelectedSlide } = this.state;
    const newTotalCardsOnSlide = App.getTotalCardsOnSlide();

    if (totalCardsOnSlide === newTotalCardsOnSlide) {
      return false;
    }

    const selectedSlide = Math.ceil(
      numberFirstCardOnSelectedSlide / newTotalCardsOnSlide
    );

    this.setState({
      selectedSlide,
      totalCardsOnSlide: newTotalCardsOnSlide,
    });

    return true;
  };

  handleSearchTextChange = ({ target: { value } }) => {
    this.setState({
      searchText: value,
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    const { searchText } = this.state;

    if (searchText === '') {
      return false;
    }

    this.setState(
      {
        selectedSlide: 1,
        numberFirstCardOnSelectedSlide: 1,
        videosDataMap: new Map(),
        pageToken: '',
        alert: {
          text: null,
          variant: null,
        },
        showSpinner: true,
        isLoadingData: true,
      },
      () => {
        this.getVideosData();
      }
    );

    return true;
  };

  handleControlBtnClick = e => {
    const { direction } = e.currentTarget.dataset;

    if (!this.canChangeSlide(direction)) {
      return false;
    }

    this.handleSlideChange(direction);
    return true;
  };

  handleDragStart = e => {
    const { isSliderAnimated } = this.state;
    const mouseStartPoint = e.touches ? e.touches[0].clientX : e.clientX;

    // Prevent to drag links and images with the mouse
    if (!e.touches) {
      e.preventDefault();
    }

    if (!isSliderAnimated) {
      this.setState({ mouseStartPoint });
    }
  };

  handleDrag = e => {
    const { selectedSlide, totalCardsOnSlide, mouseStartPoint } = this.state;
    const mouseCurrentPoint = e.touches ? e.touches[0].clientX : e.clientX;

    if (!mouseStartPoint) {
      return false;
    }

    const direction = App.getDirection(mouseStartPoint, mouseCurrentPoint);

    if (!direction) {
      return false;
    }

    const dragDistance = Math.abs(mouseStartPoint - mouseCurrentPoint);
    const sliderTrackPosition =
      (selectedSlide - 1) * CARD_WIDTH * totalCardsOnSlide;

    const newSliderTrackPositon =
      direction === 'next'
        ? sliderTrackPosition + dragDistance
        : sliderTrackPosition - dragDistance;

    const sliderTrack = this.sliderTrack.current;
    sliderTrack.style.transitionDuration = '0ms';
    sliderTrack.style.transform = `translate3d(-${newSliderTrackPositon}px, 0, 0)`;

    return true;
  };

  handleDragEnd = e => {
    const { mouseStartPoint } = this.state;

    if (!mouseStartPoint) {
      return false;
    }

    const mouseEndPoint = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;
    const direction = App.getDirection(mouseStartPoint, mouseEndPoint);

    if (!direction || !this.canChangeSlide(direction)) {
      this.setState({ mouseStartPoint: null });
      return false;
    }

    this.sliderTrack.current.style.transitionDuration = `${ANIMATION_DURATION}ms`;
    this.handleSlideChange(direction);

    return true;
  };

  handleSliderClick = e => {
    const { isSliderAnimated } = this.state;

    // Prevent to go a link after mouseup event
    if (isSliderAnimated) {
      e.preventDefault();
    }
  };

  handleSlideChange = direction => {
    let isLoadingDataStart = false;
    const { totalCardsOnSlide, selectedSlide, isLoadingData } = this.state;
    const newSelectedSlide =
      direction === 'next' ? selectedSlide + 1 : selectedSlide - 1;
    const numberFirstCardOnSelectedSlide =
      (newSelectedSlide - 1) * totalCardsOnSlide + 1;

    if (!isLoadingData && this.isNeedToLoadCards(newSelectedSlide)) {
      this.getVideosData();
      isLoadingDataStart = true;
    }

    this.setState(
      {
        ...(isLoadingDataStart && { isLoadingData: true }),
        isSliderAnimated: true,
        selectedSlide: newSelectedSlide,
        numberFirstCardOnSelectedSlide,
        mouseStartPoint: null,
      },
      () => {
        this.updateSliderAnimatedState();
      }
    );
  };

  getVideosData = async () => {
    let newStateOptions;
    const { videosDataMap } = this.state;
    const currentVideosDataMap = new Map([...videosDataMap]);

    try {
      const videosIds = [];
      const basicVideosData = await this.getBasicVideosData();
      const {
        nextPageToken = '',
        items: basicVideosDataList,
      } = basicVideosData;

      if (basicVideosDataList.length === 0 && currentVideosDataMap.size === 0) {
        newStateOptions = {
          alert: {
            variant: 'warning',
            text:
              "We are so sorry! We couldn't find any video for your request.",
          },
        };
        return false;
      }

      basicVideosDataList.forEach(({ id: { videoId } }) => {
        if (!currentVideosDataMap.has(videoId)) {
          videosIds.push(videoId);
        }
      });

      if (videosIds.length === 0) {
        return false;
      }

      const extendedVideosData = await youTubeAPI.fetchExtendedVideosData(
        videosIds
      );
      const { items: extendedVideosDataList } = extendedVideosData;

      extendedVideosDataList.forEach(videoData => {
        currentVideosDataMap.set(videoData.id, videoData);
      });

      newStateOptions = {
        pageToken: nextPageToken,
        videosDataMap: currentVideosDataMap,
      };
    } catch (error) {
      if (currentVideosDataMap.size === 0) {
        newStateOptions = {
          alert: {
            variant: 'warning',
            text:
              'Something was wrong! Check your network connection and try searching again.',
          },
        };
      }
    } finally {
      this.setState({
        ...newStateOptions,
        showSpinner: false,
        isLoadingData: false,
      });
    }

    return true;
  };

  getBasicVideosData = async () => {
    const { searchText, pageToken, maxVideoResults } = this.state;
    const data = await youTubeAPI.fetchBasicVideosData(
      searchText,
      pageToken,
      maxVideoResults
    );

    return data;
  };

  updateSliderAnimatedState = () => {
    window.setTimeout(() => {
      this.setState({
        isSliderAnimated: false,
      });
    }, ANIMATION_DURATION);
  };

  canChangeSlide = direction => {
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
  };

  isNeedToLoadCards = selectedSlide => {
    const { pageToken } = this.state;
    const totalSlides = this.getTotalSlides();

    if (!pageToken) {
      return false;
    }

    if (selectedSlide <= totalSlides - 3) {
      return false;
    }

    return true;
  };

  render() {
    const {
      pageToken,
      searchText,
      alert,
      showSpinner,
      videosDataMap,
      selectedSlide,
      totalCardsOnSlide,
    } = this.state;
    const { variant: alertVariant, text: alertText } = alert;

    const totalSlides = this.getTotalSlides();
    const isExistMoreSlides = pageToken !== '';

    return (
      <main className="wrapper">
        <Search
          searchText={searchText}
          onChange={this.handleSearchTextChange}
          onSubmit={this.handleSubmitForm}
        />
        {videosDataMap.size !== 0 && (
          <Slider
            ref={this.sliderTrack}
            videosDataMap={videosDataMap}
            selectedSlide={selectedSlide}
            totalSlides={totalSlides}
            isExistMoreSlides={isExistMoreSlides}
            totalCardsOnSlide={totalCardsOnSlide}
            onControlClick={this.handleControlBtnClick}
            onClick={this.handleSliderClick}
            onMouseDown={this.handleDragStart}
            onMouseMove={this.handleDrag}
            onMouseUp={this.handleDragEnd}
            onMouseLeave={this.handleDragEnd}
            onTouchStart={this.handleDragStart}
            onTouchMove={this.handleDrag}
            onTouchEnd={this.handleDragEnd}
          />
        )}
        {alertText && <Alert variant={alertVariant}>{alertText}</Alert>}
        {showSpinner && <Spinner variant="circle" />}
      </main>
    );
  }
}

export default App;
