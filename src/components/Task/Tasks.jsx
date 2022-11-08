import React, { useState } from "react";
import "./Tasks.css";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ReactSortable, swap } from "react-sortablejs";
import { useSelector, useDispatch } from "react-redux";
import Detail, { detail } from "../Modal/Detail/Detail";
import { detailAdded } from "./DetailSlice";

function Tasks() {
  const tasks = useSelector((state) => state.task);
  const doings = useSelector((state) => state.doing);
  const dones = useSelector((state) => state.done);
  const { type } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const [task, setTask] = useState([
    {
      task: "Build UI for onboarding flow",
      id: uuidv4(),
      description:
        "Etsy glossier activated charcoal, disrupt deep v thundercats asymmetrical craft beer twee ugh bicycle rights cray PBR&B. 90's lyft art party jianbing polaroid, twee man bun Brooklyn chambray keytar. Glossier freegan viral plaid pug selfies 90's yr vexillologist austin four dollar toast XOXO yuccie hexagon man bun. Mumblecore scenester kickstarter lumbersexual yes plz selfies mlkshk big mood hoodie.",
    },
    {
      task: "Build UI for search",
      id: uuidv4(),
      description:
        "Four dollar toast cray Brooklyn vape, bespoke succulents chartreuse readymade lomo typewriter pitchfork chambray. Shaman fit direct trade jianbing. Bitters microdosing gentrify brunch raw denim. Woke mixtape bicycle rights pour-over literally small batch wolf, quinoa marfa ramps keffiyeh.",
    },
    {
      task: "Build settigs UI",
      id: uuidv4(),
      description: "Build settings UI",
    },
    {
      task: "QA and test all major user journeys",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
  ]);
  const [doing, setDoing] = useState([
    {
      task: "Design settings and search pages",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
    {
      task: "Add account management endpoints",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
    {
      task: "Design onboarding flow",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
    {
      task: "Add search endpoints",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
    {
      task: "Add aunthentication endpoints",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
    {
      task: "Research pricing points of various competitors and trial different business models",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
  ]);
  const [done, setDone] = useState([
    {
      task: "Conduct 5 wireframe tests",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
      id: uuidv4(),
    },
    {
      task: "Create wireframe prototype",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita! ",
      id: uuidv4(),
    },
    {
      task: "Review results of usability tests and iterate",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
      id: uuidv4(),
    },
    {
      task: "Create paper prototypes and conduct 10 usability tests with potential customers",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
    {
      task: "Market discovery",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
    {
      task: "Competitor analysis",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
    {
      task: "Research the market",
      id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium dolores explicabo ad ea molestias molestiae illo suscipit quo minus corrupti, dicta id, enim, cupiditate magnam omnis natus atque soluta mollitia laborum pariatur itaque similique cumque! Architecto voluptatibus harum expedita!",
    },
  ]);

  const dispatch = useDispatch();

  const detailHandeler = (item, status) => {
    const newValue = status.filter((element) => element.task === item);
    dispatch(
      detailAdded({
        id: newValue[0].id,
        task: newValue[0].task,
        discription: newValue[0].description,
      })
    );

    if (type.toLowerCase() !== "finance-officers") {
      setShowPopUp(true);
    } else {
      navigate("/unautorize");
    }
  };

  return (
    <main className="main">
      <div className="todos main-child">
        <h2 className="name">
          {" "}
          todo <span className="status"> {tasks.length}</span>
        </h2>
        <ul className="todo-lists">
          <ReactSortable list={task} setList={setTask} swap>
            {tasks.map((task) => (
              <li
                className="lists"
                key={task.id}
                onClick={() => detailHandeler(task.task, tasks)}
              >
                {task.task}
              </li>
            ))}
          </ReactSortable>
        </ul>
      </div>
      <div className="doing main-child">
        <h2 className="name">
          doing <span className="status">{doings.length}</span>
        </h2>
        <ul>
          <ReactSortable list={doing} setList={setTask} swap>
            {doings.map((doing) => (
              <li
                className="lists"
                key={doing.id}
                onClick={() => detailHandeler(doing.task, doings)}
              >
                {doing.task}
              </li>
            ))}
          </ReactSortable>
        </ul>
      </div>
      <div className="done main-child">
        <h2 className="name">
          done <span className="status">{dones.length}</span>
        </h2>
        <ul>
          {dones.map((done) => (
            <li
              className="lists"
              key={uuidv4()}
              onClick={() => detailHandeler(done.task, dones)}
            >
              {done.task}
            </li>
          ))}
        </ul>
      </div>
      {showPopUp && (
        <Detail showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      )}
    </main>
  );
}

export default Tasks;
