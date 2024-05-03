"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import Tasks from "../../components/Modals/CreateTaskDisplay";

function page() {
  const { isWaste } = useGlobalState();

  return <Tasks title="Wastage" tasks={isWaste} />;
}

export default page;
