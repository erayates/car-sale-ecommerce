import { db } from "@/lib/firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const advertsCollection = collection(db, "users");

    const adverts = await getDocs(advertsCollection);
    const data = adverts.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
