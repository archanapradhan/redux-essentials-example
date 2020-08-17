import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
// import { nanoid } from '@reduxjs/toolkit'
const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post!',
    content: 'More text',
    user: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
]

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
            date: new Date().toISOString(), //Redux actions and state should only contain
            //plain JS values like objects, arrays, and primitives.
            //Don't put class instances, functions, or other non-serializable values into Redux!.
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
    reactionAdded(state, action) {
      debugger
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
