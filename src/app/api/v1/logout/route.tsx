import { revokeAllSessions } from "@/lib/firebase/firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionCookie = cookies().get("__session")?.value;

  if (!sessionCookie)
    return NextResponse.json(
      { success: false, error: "Session not found." },
      { status: 400 }
    );

  cookies().delete("__session");

  await revokeAllSessions(sessionCookie);

  return NextResponse.json({
    success: true,
    data: "Signed out successfully.",
  });
}
