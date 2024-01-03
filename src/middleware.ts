import { authMiddleware } from "@clerk/nextjs";

console.log("authMiddleware", authMiddleware);
export default authMiddleware({
  publicRoutes: ["/"],
});

// export const config = {
//   matcher: ["/dashboard"],
// };
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/dashboard",
  ],
};
