import { authMiddleware } from "@clerk/nextjs/server";

// Use Clerk authentication middleware to protect routes
export default authMiddleware({
  publicRoutes: ["/"]
});

// Configure routes that will be protected by the authentication middleware
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
