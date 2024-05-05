import prisma from "@/app/utils/connect"; // Importing Prisma client instance
import { auth } from "@clerk/nextjs/server"; // Importing auth middleware
import { NextResponse } from "next/server"; // Importing NextResponse object

export async function DELETE(
    req: Request, // Request object for the incoming request
    { params }: { params: { id: string} } // Destructuring params object containing an id string
) {
    try {
        const {userId} = auth(); // Authenticating the request using Clerk's auth middleware
        const {id} = params; // Extracting id from the params object

        if (!userId) { // Checking if userId is not available, indicating an unauthorized request
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const task = await prisma.task.delete({ // Deleting a task from the database using Prisma client
            where: {
                id,
            },
        });

        return NextResponse.json(task); // Returning the deleted task as JSON response
    } catch (error) {
        console.log("error deleting task", error); // Catching any errors that occur during the process
        return NextResponse.json({error: "Error deleting task", status: 500}); // Returning an error message and status code 500 in case of an error
    }
}
