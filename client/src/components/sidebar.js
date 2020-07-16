import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Quiz</h3>
      </div>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active-link">
            Main page
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/add-new-category" activeClassName="active-link">
            Add new subject
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/add-new-question" activeClassName="active-link">
            Add new question
          </NavLink>
        </li>
        <li>
          <NavLink to="/result" activeClassName="active-link">
            Statistic
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
