"use client";
// Importing necessary modules and components
import React from "react"; // Importing React library
import { GlobalProvider } from "../context/globalProvider"; // Importing GlobalProvider from custom context
import { Toaster } from "react-hot-toast"; // Importing Toast component for displaying notifications

// Interface for defining Props for ContextProvider component
interface Props {
  children: React.ReactNode; // Children elements passed to the ContextProvider
}

// Functional component for providing context to the application
function ContextProvider({ children }: Props) {
  const [isReady, setIsReady] = React.useState(false); // State variable to track if the component is ready

  // useEffect hook to set isReady to true after a delay of 200 milliseconds
  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
  }, []);

  // If the component is not ready, display a loader
  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  // If the component is ready, render the GlobalProvider and children wrapped inside Toaster for notifications
  return (
    <GlobalProvider>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "2px solid rgba(249,249,249, 0.08)",
            borderRadius: "0.15rem",
            background: "#413c3c",
            color: "#ffffff",
          },
        }}
      />
      {children}
    </GlobalProvider>
  );
}

// Exporting the ContextProvider component as default
export default ContextProvider;