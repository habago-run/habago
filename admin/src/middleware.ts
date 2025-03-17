import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  console.log("Accessing path:", path);
  if (path === "/admin") {
    return NextResponse.redirect(new URL("/admin/welcome", req.nextUrl));
  }

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /login if the user is not authenticated
  if (!session?.id) {
    console.log("Redirecting to login due to unauthenticated access");
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(path)}`, req.nextUrl),
    );
  }

  console.log("No redirect, proceeding to next");
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/admin/:path*"],
};
