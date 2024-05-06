"use client"
import { useGlobalState } from '@/app/context/globalProvider';
import React from 'react'
import styled from 'styled-components';
import CreateContent from './CreateContent';
import TaskItem from '../TaskItem/TaskItem';
import { add } from '@/app/utils/Icons';
import Modal from './Modal';


interface Props {
  title: string;
  tasks: any[];
}

function CreateTaskDisplay({title, tasks }: Props) {
    const { theme, isLoading, openModal, modal } = useGlobalState();


  return(
      
      <TaskStyled theme={theme}>
        {modal && <Modal content={<CreateContent />} />}  {/* Modal for creating new task, using the information from create content */}
        <h1>{title}</h1>
        {!isLoading ? (
        <div className="tasks grid">
          {tasks.map((task) => (
            <TaskItem // Rendering the task tickets
            title={task.title}
            description={task.description}
            taskName={task.taskName}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
            />
          ))}
          <button className="create-ticket" onClick={openModal}> {/* Button to open modal for creating new task */}
            {add}
            New Ticket
          </button>
      </div>
  ) : (
      <div className='tasks-loader w-full h-full flex items-center justify-center'> {/*Loader while tasks are being fetched*/}
        <span className='loader'></span> 
      </div>
  )}
      </TaskStyled>
      );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 1.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.bgColor1};
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.borderRadius};
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.1rem;
  }

  .tasks {
    margin: 1.5rem 0.5rem //outer task margins
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 700;
    position: relative;
  }

  .create-ticket {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem; //gap between tickets

    height: ${(props) => props.theme.taskHeight}; //ticket box height
    color: ${(props) => props.theme.colorGrey2}; //box color
    font-weight: 600; 
    border-radius: ${(props) => props.theme.borderRadius};
    border: solid ${(props) => props.theme.borderColor};
    transition: all 0.3s ease-in-out; //transition animation

    i { //text for new ticket
      font-size: 1.5rem; 
      margin-right: 0.3rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGreyHover}; //hover color for new ticker
      color: ${(props) => props.theme.colorGrey1}; //text color for hover on new ticket
      border: solid ${(props) => props.theme.colorGrey1}; //border color for hover on new ticket
      
    }
  }
    .grid {
      display: grid; // Setting display to grid
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); // Defining grid columns
      gap: 0.8rem; // Gap between grid items
  } 
`;

export default CreateTaskDisplay;