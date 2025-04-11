'use server'
import connectDB from "@/lib/connectDB";
import Resident from "@/models/Resident" 
import { NextResponse } from "next/server"; // Corrected import

export async function GET(req,context) {
  try {
    // Establish a connection to the database
    await connectDB();
    const residentId = context.params.id;

    const fetchedResident = await Resident.findById(residentId);
  
    if (!fetchedResident) {
      return NextResponse.json({ message: "Resident not found" }, { status: 404 });
    }

    return NextResponse.json(
      { fetchedResident, message: "Resident fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging purposes (avoid exposing sensitive details in production)
    console.error("Error fetching Resident:", error);

    return NextResponse.json(
      { message: "Failed to fetch Resident", error: error.message },
      { status: 500 }
    );
  }
}




export async function PUT(req, context) {
  try {
    await connectDB();
    const residentId = context.params.id;
    const { formData } = await req.json();

    const updatedResident = await Resident.findByIdAndUpdate(
      residentId,
      formData,
      { new: true }
    );

    if (!updatedResident) {
      return NextResponse.json({ message: "Resident not found" }, { status: 404 });
    }

    return NextResponse.json(
      { resident: updatedResident, message: "Resident updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { message: "Failed to update resident", error: error.message },
      { status: 500 }
    );
  }
}

// export async function DELETE(req, context) {
//   try {
//     await connectDB();
//     const residentId = context.params.id;

//     const deletedResident = await Resident.findByIdAndDelete(residentId);

//     if (!deletedResident) {
//       return NextResponse.json({ message: "Resident not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Resident deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in DELETE request:", error);
//     return NextResponse.json(
//       { message: "Failed to delete resident", error: error.message },
//       { status: 500 }
//     );
//   }
// }