import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";

export async function POST(req: NextRequest) {
  const advertId = req.url.split("/").pop();
  const advertsRef = collection(db, "adverts");
  const q = query(advertsRef, where(documentId(), "==", advertId));
  // Execute the query to retrieve data from Firestore
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return NextResponse.json({ message: "No data found." }, { status: 404 });
  }

  const data = querySnapshot.docs.map((doc) => doc.data());

  return NextResponse.json({ data }, { status: 200 });
}
