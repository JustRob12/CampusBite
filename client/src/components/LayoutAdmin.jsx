// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // To render child routes
import Header from "./AdminHeader"; // Import your Header component
import AdminNavbar from "./NavbarAdmin";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header /> {/* Header at the top */}
      <AdminNavbar />
     
      {/* Main content area */}
      <main className="flex-grow p-8">
        <Outlet />{" "}
        {/* Renders the nested route (like Dashboard or AdminDashboard) */}
      </main>
    </div>
  );
};

export default LayoutAdmin;
