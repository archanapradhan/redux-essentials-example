import { createSlice, nanoid } from '@reduxjs/toolkit'
// import { nanoid } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post!', content: 'More text' },
  ],
  reducers: {
    //2 ways to write reducer
    //  postAdded: (state, action) => {
    //    state.push(action.payload)
    //  },
    //  postAdded(state, action){
    //    state.push(action.payload)
    //  },

    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
        debugger
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        }
      },
    },
    postUpdated(state, action) {
      debugger
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
