import { createSlice, nanoid } from '@reduxjs/toolkit'
// import { nanoid } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: [
    { id: '1', title: 'First Post!', content: 'Hello!', user: '' },
    { id: '2', title: 'Second Post!', content: 'More text', user: '' },
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
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content, user } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.user = user
      }
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
