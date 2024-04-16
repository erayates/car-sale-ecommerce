import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";

export async function GET(req: NextRequest) {
  const advertId = req.url.split("/").pop();
  const advertsRef = collection(db, "adverts");
  const q = query(advertsRef, where(documentId(), "==", advertId));
  // Execute the query to retrieve data from Firestore
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return NextResponse.json({ message: "No data found." }, { status: 404 });
  }

  const advert = querySnapshot.docs[0].data();

  return NextResponse.json(advert, { status: 200 });
}
