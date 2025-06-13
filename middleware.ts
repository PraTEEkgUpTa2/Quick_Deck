import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");

  const isAuthPage = req.nextUrl.pathname === "/deck-generator";

  if (!token && isAuthPage) {
    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("redirected", "unauthenticated");

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/deck-generator"],
};
