"use client";
import React from "react";
import { GlobalProvider } from "../context/globalProvider";
import { Toaster } from "react-hot-toast";

interface Props {
children: React. ReactNode;
}

function ContextProvider({ children }: Props) {

    const [isReady, setIsReady] = React. useState(false);
    React. useEffect(() => {
    setTimeout (() => {
    setIsReady (true);
    }, 200);
    }, []);

    if (!isReady) {
        return (
        <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
        </div>
        );
    }

return <GlobalProvider>
<Toaster
    toastOptions={{
  className: '',
  style: {
    border: '2px solid rgba(249,249,249, 0.08)',
    borderRadius: '0.15rem',
    background: '#413c3c',
    color: "#ffffff",
  },
}}
/>
    {children}</GlobalProvider>
}
export default ContextProvider;