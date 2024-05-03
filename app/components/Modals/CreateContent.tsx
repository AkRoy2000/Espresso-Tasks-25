'use client'
import { useGlobalState } from "@/app/context/globalProvider";
import { add } from "@/app/utils/Icons";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

function CreateContent() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [waste, setWaste] = useState(false);
  const [methods, setMethod] = useState(false);
  const [completed, setCompleted] = useState(false);

  const {theme, allTasks, closeModal} = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "taskName":
          setTaskName(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "tasks":
        setTasks(e.target.checked);
        break;
      case "cleaning":
        setCleaning(e.target.checked);
        break;
      case "waste":
        setWaste(e.target.checked);
        break;
      case "methods":
        setMethod(e.target.checked);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
        default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      taskName,
      date,
      tasks,
      cleaning,
      waste,
      methods,
      completed,
    };

    try {
      const res = await axios.post("/api/tasks", task );

      if(res.data.error){
        toast.error;
      }

      if(!res.data.error){
      toast.success("Ticket created successfully")
      allTasks();
      closeModal();
      }
    
    } catch (error) {
        toast.error("Error, unable to create ticket");
        console.log(error);
    }

    if (!title || !description || !taskName || !date) {
      return(
        toast.error("Missing required fields")
      )
    }

    if (!tasks && !cleaning && !waste && !methods) {
      return(
        toast.error("Please select a category")
      )
    }

    if (title.length < 3) {
      return(
        toast.error("Title must be at least 3 characters long")
      )
    }
  }

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
    <h1>New Ticket</h1>
    <div className="input-control">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        name="title"
        onChange={handleChange("title")}
        placeholder="e.g, Juice Oranges"
      />
    </div>
    <div className="input-control">
      <label htmlFor="description">Description</label>
      <textarea
        value={description}
        onChange={handleChange("description")}
        name="description"
        id="description"
        rows={3}
        placeholder="e.g, Juice oranges until the jug is full of freshly squeezed juice"
      ></textarea>
    </div>
    <div className="input-control">
      <label htmlFor="date">Date</label>
      <input
        value={date}
        onChange={handleChange("date")}
        type="date"
        name="date"
        id="date"
      />
    </div>
    <div className="input-control">
      <label htmlFor="title">Name</label>
      <input
        type="text"
        id="taskName"
        value={taskName}
        name="taskName"
        onChange={handleChange("taskName")}
        placeholder="e.g, Abhik"
      />
    </div>

    <div className="input-control toggler">
      <input
        value={tasks.toString()}
        onChange={handleChange("tasks")}
        type="checkbox"
        name="tasks"
        id="tasks"
      />
      <label htmlFor="tasks">Task</label>

      <input
        value={cleaning.toString()}
        onChange={handleChange("cleaning")}
        type="checkbox"
        name="cleaning"
        id="cleaning"
      />
      <label htmlFor="cleaning">Cleaning</label>
      <input
        value={waste.toString()}
        onChange={handleChange("waste")}
        type="checkbox"
        name="waste"
        id="waste"
      />
      <label htmlFor="waste">Waste</label>
      
      <input
        value={methods.toString()}
        onChange={handleChange("methods")}
        type="checkbox"
        name="methods"
        id="methods"
     />
     <label htmlFor="method">Method</label>
    </div>
    <div className="submit-btn">
        <SubmitButton type="submit">
          <ButtonIcon>{add}</ButtonIcon>
          Add
        </SubmitButton>
      </div>
    </CreateContentStyled> 
    );
  }

  const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;

  }
  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 0.6rem 0;
    font-weight: 600;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.4rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);
    }

    input,
    textarea {
      width: 100%;
      padding: 1.4rem;
      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: ${(props) => props.theme.borderRadius};
    }
  }
  .toggler {
    display: inline-block;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-bottom: 0.5rem;
    }

    input {
      width: initial;
      
    }
  }
`;

const SubmitButton = styled.button`

  transition: all 0.20s ease-in-out;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 0.8rem 2rem;
  font-weight: 500;
  font-size: 1.2rem;
  background:#a100e6;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #18b850;
  }
`;
const ButtonIcon = styled.i`
  margin-right: 0.5rem;
`;

export default CreateContent;
