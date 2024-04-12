import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase/auth";

export function middleware(request: NextRequest) {
  if (auth.currentUser) {
    return NextResponse.redirect("/", request.url);
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up"],
};
