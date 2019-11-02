import { YOUTUBE_API_URL, YOUTUBE_API_KEY } from 'utilities/constants';

class YouTubeAPI {
  static async fetchExtendedVideosData(id) {
    const path = YouTubeAPI.buildUrlQueryString({
      typeResource: 'videos',
      part: 'snippet,statistics',
      id: id.join(','),
    });
    const response = await fetch(path);
    const videosData = response.json();
    return videosData;
  }

  static async fetchBasicVideosData(searchText, pageToken, maxResults) {
    const path = YouTubeAPI.buildUrlQueryString({
      typeResource: 'search',
      type: 'video',
      part: 'snippet',
      q: searchText,
      maxResults,
      ...(pageToken && { pageToken }),
    });
    const response = await fetch(path);
    const videosId = response.json();
    return videosId;
  }

  static buildUrlQueryString({ typeResource, ...otherParams }) {
    let path = `${YOUTUBE_API_URL}/${typeResource}?key=${YOUTUBE_API_KEY}`;

    Object.keys(otherParams).forEach(param => {
      path += `&${param}=${otherParams[param]}`;
    });

    return path;
  }
}

export default YouTubeAPI;
