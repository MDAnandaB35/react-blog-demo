import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsFromAPI, fetchPostImagesFromAPI } from '../../api/posts';

// Fetch posts using the function from the API file
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await fetchPostsFromAPI();
  return posts;
});

// Fetch images using the function from the API file
export const fetchImages = createAsyncThunk('posts/fetchImages', async () => {
  const images = await fetchPostImagesFromAPI();
  return images;
});

const initialState = {
  posts: [],
  localPosts: [],
  images: [], // Add images to state
  status: 'idle',
  error: null,
  imagesStatus: 'idle', // Track images fetch status
  imagesError: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.localPosts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Logic for fetchImages
      .addCase(fetchImages.pending, (state) => {
        state.imagesStatus = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.imagesStatus = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.imagesStatus = 'failed';
        state.imagesError = action.error.message;
      });
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;
