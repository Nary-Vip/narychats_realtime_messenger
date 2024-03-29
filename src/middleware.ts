import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/",
  },
});

export const config = { 
  matcher: [
    "/user/:path*",
    "/conversations/:path*",
  ]
};