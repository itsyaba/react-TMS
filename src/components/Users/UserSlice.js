import { createSlice } from "@reduxjs/toolkit";

const initialState = {
          name: ''
}


const userSlice = createSlice({
          name: 'user',
          initialState,
          reducers: {
                    userDetail(state, action) {
                              let res = action.payload
                              state.name = res.name
                              console.log(state.name)
                    },

          }
})

export default userSlice.reducer
export const { userDetail } = userSlice.actions