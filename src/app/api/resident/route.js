'use server'
import connectDB from "@/lib/connectDB";
import Resident from "@/models/Resident";
// import clientPromise from '@/lib/mongodb';
import { NextResponse } from "next/server"; // Corrected import

export async function GET(req) {
  try {
    // Establish a connection to the database
    await connectDB();
    // const client = await clientPromise;
    // const db = client.db('cep');
    // const residents = await db.collection('Resident').find({}).toArray();

    // Fetch all events from the database
    const residents = await Resident.find();

    if (!residents || residents.length === 0) {
      return NextResponse.json(
        { message: "No residents found" },
        { status: 404 }
      );
    }

    // Respond with the fetched events
    return NextResponse.json(
      { residents, message: "Residents fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging purposes (avoid exposing sensitive details in production)
    console.error("Error fetching Residents:", error);

    return NextResponse.json(
      { message: "Failed to fetch Residents", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    // Parse request body
    const body = await req.json();
    const {
      name,
      age,
      gender,
      isCurrentlyPresent,
      isNowRehabilited,
      isAlive,
      photoOfPerson,
      addharCard,
      medicalReportPhoto,
    } = body;

    // Validate required fields
    if (!name || !age || !gender === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new resident
    const newResident = new Resident({
        name,
        age,
        gender,
        isCurrentlyPresent,
        isNowRehabilited,
        isAlive,
        photoOfPerson,
        addharCard,
        medicalReportPhoto,
    });

    // Save the resident to the database
    await newResident.save();

    return NextResponse.json(
      { message: "Resident created successfully", newResident },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Resident:", error);

    // Return a detailed error response for debugging
    return NextResponse.json(
      { message: "Resident creation failed", error: error.message },
      { status: 500 }
    );
  }
}