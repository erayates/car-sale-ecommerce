import { NextRequest, NextResponse } from "next/server";

import { cookies, headers } from "next/headers";
import {
  createSessionCookie,
  isUserAuthenticated,
} from "@/lib/firebase/firebase-admin";

export async function GET(req: NextRequest) {
  const session = cookies().get("__session")?.value || "";
  const userAuth = await isUserAuthenticated(session);
  if (userAuth) {
    return NextResponse.json(userAuth, {
      status: 200,
    });
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as { idToken: string };
  const idToken = reqBody.idToken;

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const sessionCookie = await createSessionCookie(idToken, { expiresIn });

  cookies().set("__session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });

  return NextResponse.json({
    success: true,
    data: "Signed in successfully.",
  });
}
