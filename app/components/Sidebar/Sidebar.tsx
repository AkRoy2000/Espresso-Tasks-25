"use client";
import React from 'react'
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';
import menu from '@/app/utils/menu';
import Link from 'next/link'
import { usePathname, useRouter}  from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

function Sidebar() {
const { theme } = useGlobalState();

const { user } = useUser();

const{firstName, lastName} = user || {
  firstName: "",
  lastName:"",
}


const router = useRouter();
const pathname = usePathname();
const handleClick = (link: string) => {


router.push(link);
};

return ( 
<SidebarStyled theme={theme}>
  <div/>
  <ul className="nav-items">
      {menu.map ((item) => {
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
