"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import Tasks from "../../components/Modals/CreateTaskDisplay";

function page() {
  const { isMethods } = useGlobalState();

  return <Tasks title="Methods" tasks={isMethods} />;
}

export default page;
