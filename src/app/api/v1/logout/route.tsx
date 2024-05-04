import { db } from "@/lib/firebase/auth";
import {
  getCurrentUser,
  revokeAllSessions,
} from "@/lib/firebase/firebase-admin";
import { doc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionCookie = cookies().get("__session")?.value;

  if (!sessionCookie)
    return NextResponse.json(
      { success: false, error: "Session not found." },
      { status: 400 }
    );

  const user = await getCurrentUser();
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { onlineStatus: false }, { merge: true });
  }

  cookies().delete("__session");

  await revokeAllSessions(sessionCookie);

  return NextResponse.json({
    success: true,
    data: "Signed out successfully.",
  });
}
