
// Function to fetch posts from the API
export const fetchPostsFromAPI = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  };

// Function to fetch images from the API
export const fetchPostImagesFromAPI = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=100');
    const data = await response.json();
    return data;
  };


  