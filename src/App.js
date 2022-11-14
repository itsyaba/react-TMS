import React from "react";
import "./App.css";
import Unautorize from './Pages/unautorize/unautorize';
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import LoginForm from './components/LogInForm/LoginForm';
import TaskForm from './Pages/TaskPage/TaskPage'
// import Adds from './components/Modal/AddNewTask/Adds';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (

    <Router>
      <Routes >
        <Route path="/" element={<LoginForm />} />
        <Route path="/role/:type" element={<TaskForm />} />
        <Route path="/unautorize" element={<Unautorize />} />
        {/* <Route path="/modal" element={<Adds />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;


