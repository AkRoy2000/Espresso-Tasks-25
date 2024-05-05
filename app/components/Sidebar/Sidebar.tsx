'use client'

// Importing necessary modules and components
import React from 'react'; // Importing React
import styled from 'styled-components'; // Importing styled-components for styling
import { useGlobalState } from '@/app/context/globalProvider'; // Importing custom hook for global state management
import menu from '@/app/utils/menu'; // Importing menu data
import Link from 'next/link'; // Importing Link component from Next.js
import { usePathname, useRouter }  from "next/navigation"; // Importing hooks for navigation from Next.js
import { UserButton, useUser } from "@clerk/nextjs"; // Importing UserButton and useUser hook from Clerk

// Functional component for the sidebar
function Sidebar() {
  // Accessing global state and functions using custom hook
  const { theme } = useGlobalState();

  // Accessing user data using useUser hook
  const { user } = useUser();

  // Destructuring first name and last name from user data
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

  // Rendering JSX for the component
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

  color: ${ (props) => props.theme. colorGrey2};


  .profile {
    margin: 2rem;
    padding: 0.5rem 0.2rem;
    position: relative;
  
    font-weight: 500; //profile text col
    color: ${(props) => props.theme.colorWhite};
    display: flex;
    align-items: center;

   h1 {
      padding-left: 1.7rem;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      line-height: 0.6rem;
    position: relative;
    z-index: 1;
    margin-left: .8rem;
    font-size: clamp(1.2rem, 4vw 1.4rem);
    line-height: 100%;
    }
  }
  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;


    &::before {
      position: absolute;
      content: "";
      //right: 0;
      //top: 0;
      //width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorPurple};

      border-bottom-left-radius: 0.4px;
      border-top-left-radius: 0.4px;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.navTab};

    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }
`;

export default Sidebar;
