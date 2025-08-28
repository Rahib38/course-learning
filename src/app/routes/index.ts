import { Router } from "express";

import AuthRoutes from "../modules/auth/auth.route";

import courseRoute from "../modules/course/course.route";
import { lessonRoute } from "../modules/lessson/lesson.route";
import UserRoutes from "../modules/user/user.route";
import { topicRoutes } from "../modules/topic/topic.route";

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
    path: "/course",
    destination: courseRoute,
  },
  {
    path: "/lesson",
    destination: lessonRoute,
  },
  {
    path: "/topic",
    destination: topicRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.destination));
export default router;
