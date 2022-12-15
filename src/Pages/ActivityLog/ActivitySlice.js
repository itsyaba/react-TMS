import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const ActivitySlice = createSlice({
          name: 'activity',
          initialState,
          reducers: {
                    ActivityAdded(state, action) {
                              state.push(action.payload)
                    }
          }
})

export default ActivitySlice.reducer
export const { ActivityAdded } = ActivitySlice.actions