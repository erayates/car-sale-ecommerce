import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const sessionToken = request.cookies.get("__session")?.value || null;
  const reqURL = request.nextUrl.pathname;

  if (!sessionToken) {
    if (
      reqURL.includes("account") ||
      reqURL === "/create-advert" ||
      reqURL === "/update-advert"
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (reqURL.includes("dashboard") && reqURL.split("/").pop() !== "login") {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  } else {
    if (reqURL === "/sign-in" || reqURL === "/sign-out") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (reqURL === "/dashboard/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const isUserAuth = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/login`,
      {
        headers: {
          Cookie: `__session=${sessionToken}`,
        },
      }
    );

    if (isUserAuth.status !== 200) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (reqURL.includes("dashboard")) {
      if (reqURL.split("/").pop() !== "login") {
        const checkUserAdmin = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/login`,
          {
            method: "PUT",
            headers: {
              Cookie: `__session=${sessionToken}`,
            },
          }
        );

        if (checkUserAdmin.status === 403) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
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
    "/dashboard/:path*",
    "/update-advert",
  ],
};
