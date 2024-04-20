import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    const advertsRef = collection(db, "adverts");

    const adverts = await getDocs(advertsRef);

    const data = adverts.docs.map((doc) => doc.data());
    // Execute the query to retrieve data from Firestore

    if (data) {
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json(
      { message: "No adverts found." },
      {
        status: 404,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const advertsCollection = collection(db, "adverts");
    const docData = {
      ...reqBody,
      status: "pending",
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      enginePower: Number(reqBody.enginePower),
      engineSize: Number(reqBody.engineSize),
      mileage: Number(reqBody.mileage),
      price: Number(reqBody.price),
      yearOfModel: Number(reqBody.yearOfModel),
      favorites: [],
    };

    await addDoc(advertsCollection, docData);

    return NextResponse.json(
      { message: "Advert created successfully." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Error.", error: err },
      { status: 500 }
    );
  }
}
