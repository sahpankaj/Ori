import axios from 'axios';

const API_KEY = '72c9382111d5b70b918378f080f5cea9';
const MAX_RESULTS = 100; // Maximum number of results to fetch and display

export async function fetchRecentImages(page, setImages, setTotalResults, setLoading) {
  try {
    setLoading(true);
    const response = await axios.get('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.getRecent',
        api_key: API_KEY,
        safe_search: 1,
        format: 'json',
        nojsoncallback: 1,
        page: page,
        per_page: MAX_RESULTS, // Limit the number of results per page
      },
    });
    const data = response.data;
    const fetchedImages = data.photos.photo;
    setImages((prevImages) => [...prevImages, ...fetchedImages]);
    setTotalResults(data.photos.total);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching recent images:', error);
    setLoading(false);
  }
}

export async function fetchSearchImages(query, page, setImages, setTotalResults, setLoading) {
  try {
    setLoading(true);
    const response = await axios.get('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.search',
        api_key: API_KEY,
        text: query,
        safe_search: 1,
        format: 'json',
        nojsoncallback: 1,
        page: page,
        per_page: MAX_RESULTS, // Limit the number of results per page
      },
    });
    const data = response.data;
    const fetchedImages = data.photos.photo;
    setImages((prevImages) => [...prevImages, ...fetchedImages]);
    setTotalResults(data.photos.total);
    setLoading(false);
  } catch (error) {
    console.error('Error searching images:', error);
    setLoading(false);
  }
}
