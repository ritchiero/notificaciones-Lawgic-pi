"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import NotificationInbox from "@/components/NotificationInbox";

export default function Base1Page() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#FAFBFD",
      }}
    >
      <Sidebar currentBase={1} onExpandChange={setSidebarExpanded} />
      <main
        style={{
          flex: 1,
          marginLeft: sidebarExpanded ? "260px" : "88px",
          padding: "24px",
          transition: "margin-left 0.3s",
        }}
      >
        <NotificationInbox />
      </main>
    </div>
  );
}
