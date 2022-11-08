import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
          title: "Build UI for search",
          discription: "Four dollar toast cray Brooklyn vape, bespoke succulents chartreuse readymade lomo typewriter pitchfork chambray. Shaman fit direct trade jianbing. Bitters microdosing gentrify brunch raw denim. Woke mixtape bicycle rights pour-over literally small batch wolf, quinoa marfa ramps keffiyeh.",
          id: uuidv4(),
          status: 'Todo'
}

const detailSlice = createSlice({
          name: 'detail',
          initialState,
          reducers: {
                    detailAdded(state, action) {
                              let data = action.payload
                              // {
                              //           data.map((item) => {
                              //                     state.title = item.task
                              //                     state.discription = item.discription
                              //                     state.id = item.id
                              //           })
                              // }
                              state.title = data.task
                              state.discription = data.discription
                              state.id = data.id
                              state.status = data.status
                              // state.status = data

                    }
          }

})

export default detailSlice.reducer
export const { detailAdded } = detailSlice.actions
