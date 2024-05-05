"use client";
// Importing necessary modules and components
import React from "react";
import { useGlobalState } from "../../context/globalProvider"; 
import Tasks from "../../components/Modals/CreateTaskDisplay"; 

// React functional component for rendering page
function Page() {
  const { isCleaning } = useGlobalState(); // Accessing isCleaning tasks from global state

  // Rendering Tasks component with title "Cleaning" and isCleaning tasks
  return <Tasks title="Cleaning" tasks={isCleaning} />;
}

// Exporting the component as default
export default Page;
