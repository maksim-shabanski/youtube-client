const BASE_PATH = 'https://www.googleapis.com/youtube/v3';
const KEY = 'key=AIzaSyCa9jR_UScpOg4BAgwC2kdjc9U1dZh1kkY';

class YouTubeAPI {
  static async fetchVideosData(id) {
    const path = YouTubeAPI.buildUrlQueryString({
      typeResource: 'videos',
      part: 'snippet,statistics',
      id: id.join(','),
    });
    const response = await fetch(path);
    const videosData = response.json();
    return videosData;
  }

  static async fetchVideosId(searchText, pageToken, maxResults) {
    const path = YouTubeAPI.buildUrlQueryString({
      typeResource: 'search',
      type: 'video',
      part: 'id',
      q: searchText,
      maxResults,
      ...(pageToken && { pageToken }),
    });
    const response = await fetch(path);
    const videosId = response.json();
    return videosId;
  }

  static buildUrlQueryString({ typeResource, ...otherParams }) {
    let path = `${BASE_PATH}/${typeResource}?${KEY}`;

    Object.keys(otherParams).forEach(param => {
      path += `&${param}=${otherParams[param]}`;
    });

    return path;
  }
}

export default YouTubeAPI;
