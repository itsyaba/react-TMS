import React from "react";
import "./Detail.css";
import { useSelector, useDispatch } from "react-redux";
import { DoingRemoved } from "../../../components/Task/DoingSlice";
import { DoneRemoved } from "../../../components/Task/DoneSlice";
import { TasksRemoved } from "../../../components/Task/TasksSlice";
import { useParams, useNavigate } from "react-router-dom";

function Detail({ showPopUp, setShowPopUp }) {
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  let { type } = useParams();
  let navigate = useNavigate();

  const ModalRemover = () => {
    // setShowModal(false);
    setShowPopUp(!showPopUp);
  };

  // navigate("/unautorize");

  const removeHandeler = (title) => {
    if (
      type.toLowerCase() === "admin" ||
      type.toLowerCase() === "super-admin"
    ) {
      dispatch(DoneRemoved(title));
      dispatch(DoingRemoved(title));
      dispatch(TasksRemoved(title));
      setShowPopUp(false);
    } else {
      navigate("/unautorize");
    }

  };

  return (
    <div className="detail-container">
      <div className="background" onClick={ModalRemover}></div>
      <div className="detail-modal">
        <div className="detail-one">
          <h1 className="detail-head">{detail.title}</h1>
          <p className="detail-paragraph"> {detail.discription}</p>
        </div>
        <div className="detail-two">
          <h2>Current Status</h2>
          <select name="task" className="select">
            <option value={detail.status}>{detail.status}</option>
          </select>
          <button
            className="removeBtn"
            onClick={() => removeHandeler(detail.title)}
          >
            Remove Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
