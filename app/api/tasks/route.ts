import prisma from "@/app/utils/connect"; // Importing Prisma client instance
import { auth } from "@clerk/nextjs/server"; // Importing auth middleware
import { NextResponse } from "next/server"; // Importing NextResponse object

// Handler function for handling POST requests
export async function POST(req: Request) {
  try {
    const { userId } = auth(); // Authenticating the request using Clerk's auth middleware

    if (!userId) { // Checking if userId is not available, indicating an unauthorized request
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    // Extracting data from the request body
    const { title, description, taskName, date, tasks, cleaning, waste, methods, completed } = await req.json();

    if (!title || !description || !taskName || !date) { // Checking for missing required fields
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (!tasks && !cleaning && !waste && !methods) { // Checking if at least one category must be selected
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

    // Creating a new task in the database using Prisma client
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
    return NextResponse.json({ error: "Error creating ticket", status: 500 }); // Returning an error message and status code 500 in case of an error
  }
}

// Handler function for handling GET requests
export async function GET(req: Request) {
  try {
    const { userId } = auth(); // Authenticating the request using Clerk's auth middleware

    if (!userId) { // Checking if userId is not available, indicating an unauthorized request
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    // Fetching tasks from the database for the authenticated user using Prisma client
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks); // Returning the fetched tasks as JSON response
  } catch (error) {
    return NextResponse.json({ error: "Error Grabbing tickets", status: 500 }); // Returning an error message and status code 500 in case of an error
  }
}

// Handler function for handling PUT requests
export async function PUT(req: Request) {
  try {
    const { userId } = auth(); // Authenticating the request using Clerk's auth middleware

    const { isCompleted, id } = await req.json(); // Extracting data from the request body

    if (!userId) { // Checking if userId is not available, indicating an unauthorized request
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    // Updating a task in the database using Prisma client
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
    return NextResponse.json({ error: "Error updating task", status: 500 }); // Returning an error message and status code 500 in case of an error
  }
}
