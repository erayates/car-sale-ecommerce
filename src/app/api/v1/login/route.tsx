import { NextRequest, NextResponse } from "next/server";

import { cookies, headers } from "next/headers";
import {
  auth,
  createSessionCookie,
  getCurrentUser,
  isUserAdmin,
  isUserAuthenticated,
} from "@/lib/firebase/firebase-admin";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/auth";

export async function GET(req: NextRequest) {
  const session = cookies().get("__session")?.value || "";
  const userAuth = await isUserAuthenticated(session);

  if (userAuth) {
    return NextResponse.json(
      { message: "User authenticated successfully!" },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = (await request.json()) as { idToken: string };
    const idToken = reqBody.idToken;

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    cookies().set("__session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });

    // Change user logged in status
    const user = await getCurrentUser();
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { onlineStatus: true }, { merge: true });
    }

    return NextResponse.json({
      success: true,
      data: "Signed in successfully.",
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// To check user whether admin or not
export async function PUT(request: NextRequest) {
  const isAdmin = await isUserAdmin();
  if (isAdmin) {
    return NextResponse.json({ message: "User is admin!" }, { status: 200 });
  }

  return NextResponse.json(
    {
      message: "You don't have permit to access this route.",
    },
    { status: 403 }
  );
}
