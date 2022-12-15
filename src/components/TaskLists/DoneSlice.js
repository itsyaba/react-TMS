import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [

          {
                    task: "Competitor analysis",
                    id: uuidv4(),
                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
                    status: "done",
                    assignedTo: ['Felicity'],


          },
          {
                    task: "Research the market",
                    id: uuidv4(),
                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
                    status: "done",
                    assignedTo: ['Enoch' , ' uana'],

          },
]

const DoneSlice = createSlice({
          name: 'done',
          initialState,
          reducers: {
                    DoneAdded(state, action) {
                              state.push(action.payload)
                    }, DoneRemoved(state, action) { //REMOVER
                              const ItemName = action.payload
                              return state.filter((item) => ItemName !== item.task)

                    },
          }
})

export default DoneSlice.reducer
export const { DoneAdded, DoneRemoved } = DoneSlice.actions
