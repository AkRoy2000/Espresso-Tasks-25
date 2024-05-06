'use client' 
// Importing necessary modules and components
import { useGlobalState } from "@/app/context/globalProvider";
import { add } from "@/app/utils/Icons";
import axios from "axios"; // Importing axios for making HTTP requests
import React, { useState } from "react";
import toast from "react-hot-toast"; // Importing toast notification library
import styled from "styled-components"; // Importing styled-components for styling
import sanitize from "sanitize-html"; // Importing sanitiz to help protect site from malicious input attacks

// Function for creating a new ticket
function CreateContent() {

  // Variables used to store input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [waste, setWaste] = useState(false);
  const [methods, setMethod] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Accessing global state and functions
  const {theme, allTasks, closeModal} = useGlobalState();

  // Function to handle input changes
  const handleChange = (name: string) => (e: any) => {
    // Switching over input field names to all users to input data into variable areas
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

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validation checks for required fields
    if (!title || !description || !taskName || !date) {
      return(
        toast.error("Error: Missing required fields")
      )
    }

    // Validation check for selecting at least one category
    if (!tasks && !cleaning && !waste && !methods) {
      return(
        toast.error("Error: Please select a category")
      )
    }

    // Validation check for minimum title length
    if (title.length < 3) {
      return(
        toast.error("Error: Title must be at least 3 characters long")
      )
    }

    // Validation check for max name length
    if (title.length > 30) {
        return(
          toast.error("Error: Title Cannot be over 30 Characters")
        )
      }

    // Validation check for max name length
    if (taskName.length > 30) {
      return(
        toast.error("Error: Name Cannot be over 30 Characters")
      )
    }
    

    // Creating a task object with form data
    const task = {
      title: sanitize(title),
      description: sanitize(description),
      taskName: sanitize(taskName),
      date,
      tasks,
      cleaning,
      waste,
      methods,
      completed,
    };

    try {
      // Making a POST request to create a new task and store on server using axios
      const res = await axios.post("/api/tasks", task );

      // Handling response
      if(res.data.error){
        toast.error;
      }

      if(!res.data.error){
      toast.success("Ticket created successfully") // UI indication that ticket was created
      allTasks();
      closeModal(); // Closes model used to create a ticket
      }
    
    } catch (error) {
        toast.error("Error: unable to create ticket"); // UI indication that ticket was not created
        console.log(error);
    }
  }

  // Creates the form used to input data
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

  // Styled component for the form
  const CreateContentStyled = styled.form`
  > h1 { //new ticket header
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 700;

  }
  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 0.6rem 0; // margin between each input variable
    font-weight: 700;

    label { // label of input style
      margin-bottom: 0.4rem; 
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);
    }

    input,
    textarea { //text area input style
      width: 100%;
      padding: 1.4rem;
      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark}; //bg color of text area
      color: ${(props) => props.theme.colorGrey2};
      border-radius: ${(props) => props.theme.borderRadius};
    }
  }
  .toggler { //toggle button styles
    display: inline-block;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label { //label of toggler postions 
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

// Styled component for the submit button
const SubmitButton = styled.button`

  transition: all 0.20s ease-in-out;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 0.8rem 2rem;
  font-weight: 500;
  font-size: 1.2rem;
  background:#a100e6; //before 
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #18b850; //after mouse hover
  }
`;

// Styled component for the icon button
const ButtonIcon = styled.i`
  margin-right: 0.5rem;
`;

// Exporting the component as the default export
export default CreateContent;
