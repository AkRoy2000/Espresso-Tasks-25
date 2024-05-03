"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import Tasks from "../../components/Modals/CreateTaskDisplay";

function page() {
  const { isCleaning } = useGlobalState();

  return <Tasks title="Cleaning" tasks={isCleaning} />;
}

export default page;




