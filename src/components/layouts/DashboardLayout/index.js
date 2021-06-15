import React from "react";
import Sidebar from "./Sidebar";
import "./DashboardLayout.scss";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard dflex">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <section>{children}</section>
      </main>
    </div>
  );
};

export default DashboardLayout;
