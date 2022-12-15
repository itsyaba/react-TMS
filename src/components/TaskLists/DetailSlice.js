import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
          title: "",
          description: "",
          id: "",
          status: "",
          assignedTo: [],
}

const detailSlice = createSlice({
          name: 'detail',
          initialState,
          reducers: {
                    detailAdded(state, action) {
                              let data = action.payload
                              state.title = data.task
                              state.description = data.description
                              state.id = data.id
                              state.status = data.status
                              state.assignedTo = data.assignedTo
                    }
          }

})

export default detailSlice.reducer
export const { detailAdded } = detailSlice.actions
