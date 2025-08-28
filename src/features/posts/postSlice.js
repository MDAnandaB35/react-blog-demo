import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchPostsFromAPI, 
  fetchPostImagesFromAPI, 
  createPost, 
  updatePost, 
  deletePost,
  fetchPostById 
} from '../../api/posts';

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

// Create new post
export const createNewPost = createAsyncThunk('posts/createPost', async (postData) => {
  const newPost = await createPost(postData);
  return newPost;
});

// Update post
export const updateExistingPost = createAsyncThunk('posts/updatePost', async ({ id, postData }) => {
  const updatedPost = await updatePost(id, postData);
  return updatedPost;
});

// Delete post
export const deleteExistingPost = createAsyncThunk('posts/deletePost', async (id) => {
  await deletePost(id);
  return id;
});

// Fetch single post
export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (id) => {
  const post = await fetchPostById(id);
  return post;
});

const initialState = {
  posts: [],
  localPosts: [],
  images: [], // Add images to state
  status: 'idle',
  error: null,
  imagesStatus: 'idle', // Track images fetch status
  imagesError: null,
  selectedPost: null,
  createStatus: 'idle',
  updateStatus: 'idle',
  deleteStatus: 'idle',
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.localPosts.push(action.payload);
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
    clearStatuses: (state) => {
      state.createStatus = 'idle';
      state.updateStatus = 'idle';
      state.deleteStatus = 'idle';
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
      })
      // Create post cases
      .addCase(createNewPost.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.posts.unshift(action.payload);
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.error.message;
      })
      // Update post cases
      .addCase(updateExistingPost.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateExistingPost.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updateExistingPost.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.error.message;
      })
      // Delete post cases
      .addCase(deleteExistingPost.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteExistingPost.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(deleteExistingPost.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      })
      // Fetch single post cases
      .addCase(fetchSinglePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPost = action.payload;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, clearSelectedPost, clearStatuses } = postSlice.actions;

export default postSlice.reducer;
