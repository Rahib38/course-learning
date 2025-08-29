import { analyticsController } from './analytics.controller';
import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const analyticsRouter = Router();

// Only teacher can see their course analytics
analyticsRouter.get("/", auth(USER_ROLE.TEACHER), analyticsController.getCourseAnalytics);

export default analyticsRouter;
