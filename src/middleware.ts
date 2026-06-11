import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/features/auth/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = req.cookies.get("session")?.value;

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
