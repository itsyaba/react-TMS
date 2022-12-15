import { createSlice } from "@reduxjs/toolkit"

const initialState = {
          name: ""
}

const loginSlice = createSlice({
          name: 'username',
          initialState,
          reducers: {
                    LoginAs(state, action) {
                              let data = action.payload
                              state.name = data.name
                    }
          }

})

export default loginSlice.reducer
export const { LoginAs } = loginSlice.actions