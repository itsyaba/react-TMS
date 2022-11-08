import React, { useState, useRef , useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "./AddNewTask.css";
import { TodoAdded } from "../../Task/TasksSlice";
import { DoneAdded } from "../../Task/DoneSlice";
import { DoingAdded } from "../../Task/DoingSlice";

function AddNewTask({ modal, setModal }) {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [status, setStatus] = useState("todo");

  const dispatch = useDispatch();
  const inputRef = useRef();

useEffect(() => {
    inputRef.current?.focus();
}, [title])

  const SaveHandeler = (event) => {
    event.preventDefault();
    if (title && discription) {
      if (status === "todo") {
        dispatch(
          TodoAdded({
            id: uuidv4(),
            task: title,
            description: discription,
          })
        );
      } else if (status === "done") {
        dispatch(
          DoneAdded({
            id: uuidv4(),
            task: title,
            description: discription,
          })
        );
      } else if (status === "doing") {
        dispatch(
          DoingAdded({
            id: uuidv4(),
            task: title,
            description: discription,
          })
        );
      }
    }

    setTitle("");
    setDiscription("");
    setModal(!modal);
  };

  const keyDownHandeler = (event) => {
    if (event.key === "Escape") {
      setModal(false);
    }
  };

  return (
    <div className="container" onKeyDown={keyDownHandeler}>
      <div
        className="background"
        onClick={() => {
          setModal(false);
        }}
        onKeyDown={keyDownHandeler}
      ></div>
      <div className="model">
        <h2 className="add">Add Task</h2>
        <div className="form-container">
          <form>
            <label htmlFor="title" className="title-label">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g Take coffee break"
              className="title-input"
              name="name"
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="descripion" className="descripion-label">
              Description
            </label>
            <textarea
              name="descripion"
              className="descripion-input"
              placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            ></textarea>
            <div className="options">
              <select name="name" className="select">
                <option
                  value="todo"
                  className="opt"
                  onClick={() => setStatus("todos")}
                >
                  Todo
                </option>
                <option
                  value="doing"
                  className="opt"
                  onClick={() => setStatus("doing")}
                >
                  Doing
                </option>
                <option
                  value="done"
                  className="opt"
                  onClick={() => setStatus("done")}
                >
                  Done
                </option>
              </select>
            </div>
            <button className="submitBtn" onClick={SaveHandeler}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewTask;
