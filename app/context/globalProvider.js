"use client";
// Importing necessary modules and components
import React, { createContext, useState, useContext } from "react"; 
import themes from "./themes"; // Importing theme configuration
import axios from "axios"; // Importing axios for making HTTP requests
import toast from "react-hot-toast"; // Importing toast notification library
import { useUser } from "@clerk/nextjs"; // Importing useUser hook from Clerk for managing user authentication

// Creating global context for state management
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

// Global provider component to manage application state
export const GlobalProvider = ({ children }) => {
  const { user } = useUser(); // Accessing user data using useUser hook from Clerk

  // State variables for managing theme, loading state, modal state, and tasks
  const [selectedTheme, setSelectedTheme] = useState(0); // State variable for selected theme, only dark mode is used as light mode is not finished so toggling has not been set up
  const [isLoading, setIsLoading] = useState(false); 
  const [modal, setModal] = useState(false); // State variable for modal state
  const [tasks, setTasks] = useState([]); // State variable for tasks

  // Theme variable based on selected theme
  const theme = themes[selectedTheme];

  // Function to open modal
  const openModal = () => {
    setModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModal(false);
  };

  // Function to fetch all tasks
  const allTasks = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      // Fetch tasks from server
      const res = await axios.get("/api/tasks");

      // Sort tasks based on when they were created, displaying newest ones first
      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      // Update tasks state with fetched tasks
      setTasks(res.data);
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      // Send delete request to server to delete task with given id
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Ticket Deleted"); // Show success toast message
      allTasks(); // Refresh tasks list
    } catch (error) {
      toast.error("Error: Unable to delete ticket"); // Show error toast message
    }
  };

  // Function to update task complete status
  const updateTask = async (task) => {
    try {
      // Send put request to server to update task complete status
      await axios.put(`/api/tasks`, task);
      toast.success("Task updated"); // Show success toast message
      allTasks(); // Refresh tasks list
    } catch (error) {
      toast.error("Error: Something went wrong"); // Show error toast message
    }
  };

  // Filter tasks based on completion status and categories, used to display tasks on pages and prevent waste and methods been shown on home screen
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incomplete = tasks.filter((task) => task.isTasks === true);
  const isCleaning = tasks.filter((task) => task.isCleaning === true);
  const isWaste = tasks.filter((task) => task.isWaste === true);
  const isMethods = tasks.filter((task) => task.isMethod === true);
  const isHome = tasks.filter((task) => !task.isMethod && !task.isWaste);

  // Effect hook to fetch all tasks when user changes
  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  // Providing global state and functions to children components
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
        {children} {/* Render children components */}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};


export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
