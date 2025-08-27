import { Router } from "express";

import AuthRoutes from "../modules/auth/auth.route";

import MealRoutes from "../modules/meal/meal.route";

import UserRoutes from "../modules/user/user.route";

const router = Router();
const routes = [
  {
    path: "/auth",
    destination: AuthRoutes,
  },
  {
    path: "/user",
    destination: UserRoutes,
  },

  {
    path: "/meal",
    destination: MealRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.destination));
export default router;
