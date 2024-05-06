"use client";
// Importing necessary modules and components
import { useGlobalState } from '@/app/context/globalProvider'; 
import { trash } from '@/app/utils/Icons'; // Importing trash icon
import React from 'react';
import styled from 'styled-components'; // Importing styled-components for styling
import formatDate from '@/app/utils/formatDate'; // Importing utility function to format date

// Interface for component props
interface Props {
  title: string;
  description: string;
  taskName: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

// Functional component for a task item, displays the task tickets on the pages
function TaskItem({ title, description, taskName, date, isCompleted, id }: Props) {

  // Accessing global state and functions using custom hook
  const { theme, deleteTask, updateTask } = useGlobalState();

  return (
    <TaskItemStyled theme={theme}>
            <h1>{title}</h1>
            <p>{description}</p>
            <p className='date'>{formatDate(date)}</p>
            <div className='task-footer'>
            <h2><div className='taskName'>{taskName}</div></h2>
              {isCompleted ? (
                <button className='completed' onClick={() => {
                  const task = {
                    id,
                    isCompleted: !isCompleted
                  };
                  
                  updateTask(task);
                }}>Complete</button>
              ) : (
                <button className='task' onClick={() => {
                  const task = {
                    id,
                    isCompleted: !isCompleted
                  };

                  updateTask(task);
                }}>Incomplete</button>
              )}
            <button className='delete' onClick={() => {
                deleteTask(id);
            }}>{trash}</button>
            </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  //ticket layout style setup
  padding: 0.7rem 0.9rem;
  border-radius: ${(props) => props.theme.borderRadius}; 
  background-color: ${(props) => props.theme.colorTasks};
  border: 2px solid ${(props) => props.theme.borderColor};

  //ticket layout size setup
  height: ${(props) => props.theme.taskHeight};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  .date {
    margin-top: auto;
  }

  > h1 { //ticket title font 
    font-size: 1.7rem;
    font-weight: 700;
  }

  .task-footer { //footer style setup
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button { //delete and complete button style
      cursor: pointer;
      i {
        font-size: 1.6rem;
      }
      

    }
    .task, .completed {
      display: inline-block;
      padding: 0.4rem 1rem;
      background:  ${(props) => props.theme.colorOrange};
      border-radius: ${(props) => props.theme.borderRadius};
      &:hover {
        color: ${(props) => props.theme.colorGrey3}!important;
        transition: all 0.3s ease-in-out; // animation on color
      }
    }
    .taskName {
      display: inline-block;
      padding: 0.4rem 1rem;
      background:  ${(props) => props.theme.colorPurple};
      border-radius: ${(props) => props.theme.borderRadius};
    }
    .completed {
      background: ${(props) => props.theme.colorGreen} !important; //highlight of complete button color
    }
    .delete {
      margin-left: auto;
      &:hover {
        color: ${(props) => props.theme.colorOrange}!important; //delete button color change
        transition: all 0.3s ease-in-out; // animation on color
    }
    }   
  }

`;

export default TaskItem