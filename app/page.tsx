"use client";
import React from "react";
import Tasks from "./components/Modals/CreateTaskDisplay";
import { useGlobalState } from "./context/globalProvider";


export default function Home() {

  const {isHome} = useGlobalState(); // returns all tasks - wastage and methods. as these dont need to be on the home page 
  return (
      <Tasks title="Espresso Task Management" tasks={isHome}/>
      
        );
}
