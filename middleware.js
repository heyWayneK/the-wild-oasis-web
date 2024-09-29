import { auth } from "@/app/_lib/auth";

// export function middleware(request) {
//   console.log(request);
//   return NextResponse.redirect(new URL("/about", request.url));
// }

// if matched, auth.js is called on callbacks authorized ()
export const middleware = auth;

export const config = {
  // redirect if on these page/s
  matcher: ["/account"],
};
