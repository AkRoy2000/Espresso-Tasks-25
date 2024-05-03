"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import Tasks from "../../components/Modals/CreateTaskDisplay";

function page() {
  const { completedTasks } = useGlobalState();

  return <Tasks title="Completed" tasks={completedTasks} />;
}

export default page;
