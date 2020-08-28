import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())

    debugger
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    console.log('allnotification:', response.notifications)
    debugger
    return response.notifications
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {},
  extraReducers: {
    // [fetchNotifications.pending]: (state, action) => {
    //   state.status = 'loading'
    // },
    [fetchNotifications.fulfilled]: (state, action) => {
      //state.status = 'succeeded'
      debugger
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    },

    // [fetchNotifications.rejected]: (state, action) => {
    //   state.status = 'failed'
    //   state.error = action.error.message
    // },
  },
})

export default notificationsSlice.reducer

export const selectAllNotifications = (state) => state.notifications
