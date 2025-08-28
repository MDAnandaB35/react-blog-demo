
const API_BASE_URL = 'http://localhost:5000/api';

// Function to fetch posts from the local API
export const fetchPostsFromAPI = async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  };

// Function to fetch a single post by ID
export const fetchPostById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    const data = await response.json();
    return data;
  };

// Function to create a new post
export const createPost = async (postData) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    const data = await response.json();
    return data;
  };

// Function to update a post
export const updatePost = async (id, postData) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    const data = await response.json();
    return data;
  };

// Function to delete a post
export const deletePost = async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    const data = await response.json();
    return data;
  };

// Function to fetch images from the API (keeping for compatibility)
export const fetchPostImagesFromAPI = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=100');
    const data = await response.json();
    return data;
  };


  