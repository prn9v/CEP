"use server";
import Resident from "@/models/Resident";
import connectDB from "@/lib/mongoose"; // ✅ import your mongoose connection
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB(); // ✅ connect to Mongoose first

    const residents = await Resident.find();

    if (!residents || residents.length === 0) {
      return NextResponse.json(
        { message: "No residents found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { residents, message: "Residents fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching residents:", error);
    return NextResponse.json(
      { message: "Failed to fetch residents", error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    await connectDB(); // Ensure mongoose is connected

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
    if (!name || age === undefined || gender === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    //  Create new resident using the Mongoose model
    const newResident = await Resident.create({
      name,
      age,
      gender,
      isCurrentlyPresent,
      isNowRehabilited,
      isAlive,
      photoOfPerson,
      addharCard,
      medicalReportPhoto,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Resident created successfully",
        resident: newResident,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Resident:", error);
    return NextResponse.json(
      { message: "Resident creation failed", error: error.message },
      { status: 500 }
    );
  }
}

