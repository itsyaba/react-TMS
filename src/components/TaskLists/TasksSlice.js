import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState =  [
          {
                    task: "Build UI for onboarding flow",
                    id: uuidv4(),
                    description:
                              "Etsy glossier activated charcoal, disrupt deep v thundercats asymmetrical craft beer twee ugh bicycle rights cray PBR&B. 90's lyft art party jianbing polaroid, twee man bun Brooklyn chambray keytar. Glossier freegan viral plaid pug selfies 90's yr vexillologist austin four dollar toast XOXO yuccie hexagon man bun. Mumblecore scenester kickstarter lumbersexual yes plz selfies mlkshk big mood hoodie.",
                    status: "task",
                    assignedTo: ['Terry']

          },
          {
                    task: "Build UI for search",
                    id: uuidv4(),
                    status: "task",
                    assignedTo: ['Sheldon'],
                    description:
                              "Four dollar toast cray Brooklyn vape, bespoke succulents chartreuse readymade lomo typewriter pitchfork chambray. Shaman fit direct trade jianbing. Bitters microdosing gentrify brunch raw denim. Woke mixtape bicycle rights pour-over literally small batch wolf, quinoa marfa ramps keffiyeh.",
          },
          {
                    task: "Build settigs UI",
                    id: uuidv4(),
                    status: "task",
                    assignedTo: ['Terrill'],
                    description: "Build settings UI",
          },
          {
                    task: "QA and test all major user journeys",
                    id: uuidv4(),
                    status: "task",
                    assignedTo: [' Miles', ' Terry', ' Terrill'],
                    description:
                              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
          },
]

console.log(JSON.parse(localStorage.getItem("items")));


const TasksSlice = createSlice({
          name: "tasks",
          initialState,
          reducers: {
                    TodoAdded(state, action) {
                              state.push(action.payload)
                              localStorage.setItem("items", JSON.stringify(action.payload))
                    }, TasksRemoved(state, action) { //REMOVER
                              const ItemName = action.payload

                              localStorage.setItem("items", JSON.stringify(state.filter((item) => ItemName !== item.task)))
                              return state.filter((item) => ItemName !== item.task)
                    },
          }
})

export default TasksSlice.reducer
export const { TodoAdded, TasksRemoved } = TasksSlice.actions
