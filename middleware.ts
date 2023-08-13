export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/add", "/accounts", "/budgets", "/movements", "/categories", "/"],
};
