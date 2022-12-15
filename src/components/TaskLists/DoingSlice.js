import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState =
          [{
                    task: "Design settings and search pages",
                    id: uuidv4(),
                    assignedTo: ['Terrill' , "someone"],
                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
                    status: "doing"

          },
          {
                    task: "Add account management endpoints",
                    status: "doing",
                    id: uuidv4(),
                    assignedTo: ['Demetrius'],
                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
          },
          {

                    task: "Design onboarding flow",
                    id: uuidv4(),
                    status: "doing",
                    assignedTo: ['Oleta' , 'ysbdsf'],

                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
          },
          {
                    task: "Add search endpoints",
                    id: uuidv4(),
                    status: "doing",
                    assignedTo: ['Ewell'],
                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
          },
          {
                    task: "Add aunthentication endpoints",
                    id: uuidv4(),
                    status: "doing",
                    assignedTo: ['Ewell'],

                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
          },
          {
                    task: "Research pricing points of various competitors and trial different business models",
                    id: uuidv4(),
                    status: "doing",
                    assignedTo: ['Eleanora'],
                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
          },
          ]


const DoingSlice = createSlice({
          name: 'doing',
          initialState,
          reducers: {
                    DoingRemoved(state, action) { //REMOVER
                              const ItemName = action.payload
                              return state.filter((item) => ItemName !== item.task)

                    },
                    DoingAdded(state, action) {
                              state.push(action.payload)
                    },
          }
})

export default DoingSlice.reducer
export const { DoingAdded, DoingRemoved } = DoingSlice.actions

