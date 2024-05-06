import prisma from "@/app/utils/connect"; // Impor prisma client
import { auth } from "@clerk/nextjs/server"; // Import auth middleware
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request, 
    { params }: { params: { id: string} } 
) {
    try {
        const {userId} = auth(); // Authenticating the ddelete request using Clerk's auth middleware
        const {id} = params; 

        if (!userId) { // Checking if userId is not available, indicating an unauthorized request
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const task = await prisma.task.delete({ // Deleting selected task from the database using Prisma client
            where: {
                id,
            },
        });

        return NextResponse.json(task); // Returning the deleted task as JSON response
    } catch (error) {
        return NextResponse.json({error: "Error deleting task", status: 500}); // Returning json error message and status code 500 in case of an error
    }
}
