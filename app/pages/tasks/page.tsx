"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import Tasks from "../../components/Modals/CreateTaskDisplay";

function page() {
  const { incomplete } = useGlobalState();

  return <Tasks title="Tasks" tasks={incomplete} />;
}

export default page;
