"use client";

// Importing necessary modules and components
import { useGlobalState } from '@/app/context/globalProvider'; // Importing custom hook for global state management
import { trash } from '@/app/utils/Icons'; // Importing trash icon
import React from 'react'; // Importing React
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

// Functional component for a task item
function TaskItem({ title, description, taskName, date, isCompleted, id }: Props) {
  // Accessing global state and functions using custom hook
  const { theme, deleteTask, updateTask } = useGlobalState();


  return (
    <TaskItemStyled theme={theme}>
            <h1>{title}</h1>
            <p>{description}</p>
            <p className='date'>{formatDate(date)}</p>
            <h2><div className='taskName'>{taskName}</div></h2>
            <div className='task-footer'>
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
  padding: 0.7rem 0.9rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colorTasks};
  border: 2px solid ${(props) => props.theme.borderColor};

  height: ${(props) => props.theme.taskHeight};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.7rem;
    font-weight: 600;
  }

 .taskName {
  display: inline-block;
      padding: 0.4rem 1rem;
      background:  ${(props) => props.theme.colorPurple};
      border-radius: ${(props) => props.theme.borderRadius};
    }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;
      i {
        font-size: 1.4rem;
      }
      &:hover {
        color: ${(props) => props.theme.colorGrey1}!important;
    }

    }

    .delete {
      margin-left: auto;
    }

    .task, .completed  {
    
      display: inline-block;
      padding: 0.4rem 1rem;
      background:  ${(props) => props.theme.colorOrange};
      border-radius: ${(props) => props.theme.borderRadius};
    }

    .completed {
      background: ${(props) => props.theme.colorGreen} !important;
    }
  }

`;

export default TaskItem