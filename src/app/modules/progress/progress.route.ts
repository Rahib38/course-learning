import { progressController } from "./progress.controller";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const progressRouter = Router();

progressRouter.post(
  "/complete-topic",
  auth(USER_ROLE.STUDENT),
  progressController.markTopicCompleteController,
);
progressRouter.get(
  "/:courseId",
  auth(USER_ROLE.STUDENT),
  progressController.getStudentProgressController,
);

export default progressRouter;
