"use client";
import React from "react";
import Tasks from "./components/Modals/CreateTaskDisplay";
import { useGlobalState } from "./context/globalProvider";


export default function Home() {

  const {isHome} = useGlobalState();
  return (
      <Tasks title="Espresso Task Management" tasks={isHome}/>
      
        );
}
