import prisma from "@/app/utils/connect"; // Import prisma client
import { auth } from "@clerk/nextjs/server"; // Import auth middleware
import { NextResponse } from "next/server"; 

// Function for getting tasks from server
export async function GET(req: Request) {
  try {
    const { userId } = auth(); // Authenticating the request using Clerk's auth middleware

    if (!userId) { // Checking if userId is not available, indicating an unauthorized request
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    // Grabbing tasks from the database for the authenticated user using Prisma client
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks); // Returning the tasks as JSON response
  } catch (error) {
    return NextResponse.json({ error: "Error Grabbing tickets", status: 500 }); // Returning a json error message and status code 500 in case of an error
  }
}

// Function for updating ticket completion status
export async function PUT(req: Request) {
  try {
    const { userId } = auth(); // Authenticating the request using Clerk's auth middleware

    const { isCompleted, id } = await req.json(); // Extracting data from the request body

    if (!userId) { // Checking if userId is not available, indicating an unauthorized request
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    // Updating a ticket complete status in the database using Prisma client
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task); // Returning the updated task as JSON response
  } catch (error) {
    return NextResponse.json({ error: "Error updating ticket", status: 500 }); // Returning an error message and status code 500 in case of an error
  }
}

// Function for adding tasks to database
export async function POST(req: Request) {
  try {
    const { userId } = auth(); // Authenticating the request using Clerk's auth middleware

    if (!userId) { // Checking if userId is not available, indicating an unauthorized request
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    // Extracting user input data from the model
    const { title, description, taskName, date, tasks, cleaning, waste, methods, completed } = await req.json();

    if (!title || !description || !taskName || !date) { // Checking for missing required fields
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (!tasks && !cleaning && !waste && !methods) { // Checking if at least one category has been selected
      return NextResponse.json({
        error: "Category must be selected",
        status: 400,
      });
    }

    if (title.length < 3) { // Checking if title is at least 3 characters long
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    if (title.length > 30) { // Checking if title is +30 characters 
      return NextResponse.json({
        error: "Error: Title Cannot be over 30 Characters",
        status: 400,
      });
    }
  
    if (taskName.length > 30) { // Checking if name is +30 characters 
      return NextResponse.json({
        error: "Error: Name Cannot be over 30 Characters",
        status: 400,
      });
    }

    // Creating a new task in the database using Prisma client, adding the content entered by the user
    const task = await prisma.task.create({
      data: {
        title,
        description,
        taskName,
        date,
        isTasks:  tasks,
        isCleaning:  cleaning,
        isWaste:     waste,
        isMethod:    methods,
        isCompleted: completed,
        userId,
      },
    });

    return NextResponse.json(task); // Returning the created task as JSON response
  } catch (error) {
    return NextResponse.json({ error: "Error creating ticket", status: 500 }); // Returning a json error message and status code 500 in case of an error
  }
}
