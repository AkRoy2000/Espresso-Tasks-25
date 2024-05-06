'use client'
// Importing necessary modules and components
import React from 'react'; 
import styled from 'styled-components'; 
import { useGlobalState } from '@/app/context/globalProvider'; 
import menu from '@/app/utils/menu'; // Importing menu data
import Link from 'next/link'; // Importing Link component from Next.js
import { usePathname, useRouter }  from "next/navigation"; // Importing hooks for navigation from Next.js
import { UserButton, useUser } from "@clerk/nextjs"; // Importing UserButton and useUser hook from Clerk

// Functional component for the sidebar
function Sidebar() {

  // Accessing global state and functions using custom hook
  const { theme } = useGlobalState();

  // Grabbing user data using useUser hook
  const { user } = useUser();

  // using first name and last name from user data
  const { firstName, lastName } = user || {
    firstName: "",
    lastName: "",
  };

  // Initializing router and pathname using Next.js hooks
  const router = useRouter();
  const pathname = usePathname();

  // Function to handle navigation item clicks
  const handleClick = (link: string) => {
    router.push(link);
  };

  return ( 
    <SidebarStyled theme={theme}>
      <div/>
      <ul className="nav-items">
        {/* Mapping over menu items to render navigation links */}
        {menu.map((item) => {
          const link = item.link;
          return (
            <li 
              key={item.id}
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="usr-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1>
          {firstName} {lastName}
        </h1>
      </div>
    </SidebarStyled>
  );
}

// Styled component for the sidebar
const SidebarStyled = styled.nav`
  position: relative; //bg setup
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.bgColor1};
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.borderRadius};

  display:  flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${ (props) => props.theme. colorGrey2}; //inactive tab text color

  .profile {
    margin: 2rem;
    padding: 0.5rem 0.2rem;
    position: relative;
  
    font-weight: 700; // profile 
    color: ${(props) => props.theme.colorWhite};
    display: flex;
    align-items: center;

   h1 {
      padding-left: 1.7rem; // profile spacing
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      line-height: 0.7rem;
      position: relative;
      z-index: 1;
      margin-left: 0.6rem;
      font-size: clamp(1.2rem, 4vw 1.4rem);
      line-height: 100%;
    }
  }

  .active::before {
    width: 0.3rem; //width of active tab color marker
  }

  .nav-item {
    position: relative; // navbar spacing
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;

    display: grid; //grid setup 
    grid-template-columns: 50px 1fr;
    cursor: pointer;
    align-items: center;

    &::before { // selected tab color indicator
      position: absolute;
      content: "";
      //right: 0; // if enabled moved positon of indicator to the right side
      //top: 0;
      //width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorPurple};

      border-bottom-left-radius: 0.4px; // radius setup
      border-top-left-radius: 0.4px;
    }

    a {
      font-weight: 700; //menu text 
      z-index: 2; 
      line-height: 0;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons}; // inavctive tab icons color
    }
  }

  .active {
    background-color: ${(props) => props.theme.navTab}; // highlights active nav tab highlight color
    i,
    a {
      color: ${(props) => props.theme.colorPurple}; //changes active icon and text nav colors
      transition: all 0.5s ease-in-out; // animation on color
    }
  }
`;

export default Sidebar;
