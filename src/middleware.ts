import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

export const dynamic = "force-dynamic";

const publicRoutes = ["/auth"];
export const middleware = auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  if (!isAuthenticated && !publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
