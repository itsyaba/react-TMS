import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, lime, lightBlue } from "@mui/material/colors";
import "./App.css";

import { useNavigate, useParams } from "react-router-dom";

export default function App() {
  let navigate = useNavigate();
  let { type } = useParams();

  const roleChanger = (role) => {
    type = role;
    navigate(`login/${type}`);
  };

  return (
    <div className="role">
      <h1 className="role-header">Login As</h1>
      <div className="role-container">
        <div
          className="super-admin role-child"
          onClick={() => roleChanger("super-admin")}
        >
          <Avatar
            sx={{ bgcolor: deepOrange[900], width: 100, height: 100 }}
            className="avatars"
          >
            S.A
          </Avatar>
          <h1>SUPER ADMIN</h1>
        </div>
        <div className="admin role-child" onClick={() => roleChanger("Admin")}>
          <Avatar
            sx={{ bgcolor: deepOrange[100], width: 100, height: 100 }}
            className="avatars"
          >
            A
          </Avatar>
          <h1>ADMIN</h1>
        </div>
        <div
          className="operator role-child"
          onClick={() => roleChanger("operator")}
        >
          <Avatar
            sx={{ bgcolor: lightBlue[500], width: 100, height: 100 }}
            className="avatars"
          >
            O
          </Avatar>
          <h1>OPRATOR</h1>
        </div>
        <div
          className="finance role-child"
          onClick={() => roleChanger("Finance-Officers")}
        >
          <Avatar
            sx={{ bgcolor: lime[500], width: 100, height: 100 }}
            className="avatars"
          >
            F.O
          </Avatar>
          <h1>Finance Officers</h1>
        </div>
      </div>
    </div>
  );
}
