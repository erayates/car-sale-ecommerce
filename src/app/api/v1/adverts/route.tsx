import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export async function GET(req: NextRequest) {
  const advertsRef = collection(db, "adverts");

  const adverts = await getDocs(advertsRef);

  const data = adverts.docs.map((doc) => doc.data());
  // Execute the query to retrieve data from Firestore

  return NextResponse.json({ data }, { status: 200 });
}
