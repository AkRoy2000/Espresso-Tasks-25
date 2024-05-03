"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);


  const [tasks, setTasks] = useState([]);

  const theme = themes[selectedTheme];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  ;
  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
        return ( new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })

      setTasks (res.data);
      setIsLoading(false);   
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Ticket Deleted");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Error: Unable to delete ticket");
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);

      toast.success("Task updated");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incomplete = tasks.filter((task) => task.isTasks === true);
  const isCleaning = tasks.filter((task) => task.isCleaning === true);
  const isWaste = tasks.filter((task) => task.isWaste === true);
  const isMethods = tasks.filter((task) => task.isMethod === true);
  const isHome = tasks.filter((task) => !task.isMethod && !task.isWaste);

  
  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        updateTask,
        isLoading,
        completedTasks,
        incomplete,
        isCleaning,
        isWaste,
        isMethods,
        modal,
        openModal,
        closeModal,
        allTasks,
        isHome,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
