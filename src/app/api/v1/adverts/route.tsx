import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import slugify from "slugify";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  try {
    const advertsCollection = collection(db, "adverts");

    if (searchParams.get("favorites")) {
      const uid = searchParams.get("favorites");
      const q = where("favorites", "array-contains", uid);
      const querySnapshot = await getDocs(query(advertsCollection, q));

      if (querySnapshot.empty) {
        return NextResponse.json([], { status: 200 });
      }

      const userFavorites = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return NextResponse.json(userFavorites, { status: 200 });
    }

    const adverts = await getDocs(advertsCollection);
    const data = adverts.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (data) {
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json([], {
      status: 200,
    });
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
      slug: slugify(reqBody.title).toLowerCase(),
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
