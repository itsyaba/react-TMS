import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Tasks from "./components/Task/Tasks";
import RoleSelector from "./roleSelector";
import Unautorize from './unautorize';
import ErrorPage from "./components/ErrorPage";
import AuthenticationForm from "./components/LogInForm/LoginForm";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (

    <Router>
      <Routes >
        <Route path="/" element={<RoleSelector />} />
        <Route path="/role/:type" element={
          <div className="App">
            <NavBar />
            <Tasks />
          </div>
        } />
        <Route path="/login/:type" element={<AuthenticationForm />} />
        <Route path="/unautorize" element={<Unautorize />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;


