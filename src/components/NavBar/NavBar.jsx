import React from "react";
import "./NavBar.css";
import AddNewTask from "../Modal/AddNewTask/AddNewTask";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import {useSelector , useDispatch} from 'react-redux'
// import {ThemeSwitched} from './NavBarSlice'

function NavBar() {
  // const themes  = useSelector(state => state.theme)
  // const dispatch = useDispatch()

  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { type } = useParams();
  const navigate = useNavigate();

  const showModel = () => {
    if (type.toLowerCase() === "admin" || type.toLowerCase() === "super-admin") {
      setModal(!modal);
    } else {
      navigate("/unautorize");
    }
  };

  const logOutHandeler = () => {
    navigate("/");
  };


  return (
    <nav className="navbar">
      <div className="logo">
        <h1 className="title">Task Management System</h1>
        <p className="type">{type}</p>
        <button className="logoutBtn" onClick={logOutHandeler}>
          Log Out
        </button>
      </div>
      <button className="btn" onClick={showModel}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-plus"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add New Task
      </button>
      {modal && <AddNewTask modal={modal} setModal={setModal} />}
    </nav>
  );
}

export default NavBar;
