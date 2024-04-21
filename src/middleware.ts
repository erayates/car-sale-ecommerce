import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const sessionToken = request.cookies.get("__session")?.value || null;
  const reqURL = request.nextUrl.pathname;

  if (!sessionToken) {
    if (reqURL.includes("account") || reqURL === "/create-advert") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  } else {
    if (reqURL === "/sign-in" || reqURL === "/sign-out") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const isUserAuth = await fetch("http://localhost:3000/api/v1/login", {
      headers: {
        Cookie: `__session=${sessionToken}`,
      },
    });
    if (isUserAuth.status !== 200) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/account/:path*",
    "/create-advert",
    "/advert/:path*",
  ],
};
