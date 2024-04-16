import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { db } from "@/lib/firebase/auth";

export default async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("email");

  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("email", "==", userEmail))
  );

  if (querySnapshot.empty) {
    return NextResponse.json({ message: "No data found." }, { status: 404 });
  }

  const user = querySnapshot.docs[0].data();
  return NextResponse.json(user, {
    status: 200,
  });
}
