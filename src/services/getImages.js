export async function getSearchImages(query, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34825153-ab3ec4a7983bb4a4e3513dccc';

  return await fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No images found by ${query}`));
  });
}
