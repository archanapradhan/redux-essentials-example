import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
// import { sub } from 'date-fns'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  debugger
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('fakeApi/posts', { post: initialPost })
    return response.post
  }
)

// console.log(fetchPosts.rejected())
// const rejected = fetchPosts.rejected
// console.log({
//   [fetchPosts.rejected]: 1,
//   rejected,
// })

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    //2 ways to write reducer
    //  postAdded: (state, action) => {
    //    state.push(action.payload)
    //  },
    //  postAdded(state, action){
    //    state.push(action.payload)
    //  },

    postUpdated(state, action) {
      const { id, title, content, user } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.user = user
      }
    },
    reactionAdded(state, action) {
      debugger
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      debugger
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.posts.push(action.payload)
    },
    [addNewPost.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

console.log('posts Slice', postsSlice)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)
