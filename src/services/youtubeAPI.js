const BASE_PATH = 'https://www.googleapis.com/youtube/v3';
const KEY = 'key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';

class YouTubeAPI {
  async fetchVideosData(id) {
    const path = `${BASE_PATH}/videos?${KEY}&part=snippet,statistics&id=${id.join(',')}`;
    const response = await fetch(path);
    return await response.json();
  }

  async fetchVideosId(searchText, nextPageToken, maxVideoResults) {
    const pageToken = nextPageToken ? `&pageToken=${nextPageToken}` : '';
    const path = `${BASE_PATH}/search?${KEY}&type=video&part=id
      &q=${searchText}&maxResults=${maxVideoResults}${pageToken}`.trim();

    const response = await fetch(path);
    return await response.json();
  }
}

export default YouTubeAPI;
