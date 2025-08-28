import React, { useState } from "react";
import Dashboard from "./Dashboard";
import "./AdminDashboard.css";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <nav id="sidebar" className={sidebarCollapsed ? "collapsed" : ""}>
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>

        <ul className="list-unstyled components">
          <li>
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <i className="bi bi-speedometer2"></i>
              <span className="sidebar-text">Dashboard</span>
            </NavLink>
          </li>
          
          {/* Products Menu */}
          <li>
            <div 
              className={`nav-link ${openMenus.products ? "menu-open" : ""}`}
              onClick={() => toggleMenu("products")}
              style={{cursor: "pointer"}}
            >
              <a className="sidebar-text">
              <i className="bi bi-box-seam"></i>
                Products
              <i className={`bi float-end ${openMenus.products ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                </a>
            </div>
            <ul className={`list-unstyled components sub-menu ${openMenus.products ? "show" : "collapse"}`}>
              <li>
                <NavLink 
                  to="/admin/productAdd"
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  <i className="bi bi-plus-circle"></i>
                  <span className="sidebar-text">Product Add</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/admin/productTable"
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  <i className="bi bi-gear"></i>
                  <span className="sidebar-text">Manage Product</span>
                </NavLink>
              </li>
            </ul>
          </li>
          
          <li>
            <NavLink 
              to="/admin/categories"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <i className="bi bi-tags"></i>
              <span className="sidebar-text">Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/users"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <i className="bi bi-people"></i>
              <span className="sidebar-text">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/orders"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <i className="bi bi-cart"></i>
              <span className="sidebar-text">Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/analytics"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <i className="bi bi-bar-chart"></i>
              <span className="sidebar-text">Analytics</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/settings"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <i className="bi bi-gear"></i>
              <span className="sidebar-text">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/help"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <i className="bi bi-question-circle"></i>
              <span className="sidebar-text">Help</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <div id="content" className={sidebarCollapsed ? "collapsed" : ""}>
        {/* Header */}
        <header id="header">
          <button
            id="sidebarCollapse"
            className="btn btn-primary"
            onClick={toggleSidebar}
          >
            <i className="bi bi-list"></i>
          </button>
          <div className="d-flex align-items-center">
            <div className="dropdown me-3">
              <button className="btn btn-light position-relative" type="button">
                <i className="bi bi-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  5
                </span>
              </button>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <img
                  src="https://via.placeholder.com/40"
                  className="rounded-circle me-2"
                  height="30"
                  alt="Avatar"
                />
                Admin User
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink className="dropdown-item" to="/admin/profile">
                    <i className="bi bi-person me-2"></i>Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/admin/settings">
                    <i className="bi bi-gear me-2"></i>Settings
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/logout">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;