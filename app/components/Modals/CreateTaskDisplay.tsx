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
        {modal && <Modal content={<CreateContent />} />}
        <h1>{title}</h1>
        {!isLoading ? (
        <div className="tasks grid">
          {tasks.map((task) => (
            <TaskItem 
            key={task.id}
            title={task.title}
            description={task.description}
            taskName={task.taskName}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
            />
          ))}
          <button className="create-task" onClick={openModal}>
            {add}
            New Ticket
          </button>
      </div>
  ) : (
      <div className='tasks-loader w-full h-full flex items-center justify-center'>
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
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: ${(props) => props.theme.taskHeight};
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: ${(props) => props.theme.borderRadius};
    border: solid ${(props) => props.theme.borderColor};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGreyHover};
      color: ${(props) => props.theme.colorGrey1};
      border: solid ${(props) => props.theme.colorGrey1};
      
    }
  }
`;

export default CreateTaskDisplay;