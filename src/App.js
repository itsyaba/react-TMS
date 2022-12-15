import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Unautorize from './Pages/unautorize/unautorize';
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

import LoginForm from './Pages/LogInForm/LoginFormAdmin';
import TaskForm from './Pages/TaskPage/TaskPage'
import Adds from './components/Modal/AddNewTask/Adds';
import Users from './components/Users/UsersList'
import Activity from './Pages/ActivityLog/ActivityLog'
import UserDetail from './components/Users/UserDetail'
// import TaskDetail from './components/TaskDetail/Detail'

function App() {
  return (

    <Router>
      <Routes >
        <Route path="/" element={<LoginForm />} />
        <Route path="/tasks" element={<TaskForm />} />
        <Route path="/unautorize" element={<Unautorize />} />
        <Route path="/modal" element={<Adds />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="profile/:username" element={<UserDetail />} />
        {/* <Route path="/detail/:taskid" element={<TaskDetail />} /> */}

        <Route path="/role/*" element={<ErrorPage />} />
        <Route path="/error" element={<ErrorPage />} / >
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;


