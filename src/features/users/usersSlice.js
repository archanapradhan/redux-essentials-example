import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Bhuvanesh Rathore' },
  { id: '1', name: 'Naresh Rathore' },
  { id: '2', name: 'Ina Rathore' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer

// function createSlice2(obj) {
//   const keyname = obj.name
//   for (const [key, value] of Object.entries(obj.reducers)) {
//     console.log(`${key}: ${value}`)
//     const actionName = key
//     const reducer = value
//   }
//   const state = obj.initialState
// }
