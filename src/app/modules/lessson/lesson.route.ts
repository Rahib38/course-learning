import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { lessonController } from "./lesson.controller";
import { createLessonSchema, updateLessonSchema } from "./lesson.validation";

export const lessonRoute = Router();

lessonRoute.post(
  "/create-lesson",
  auth(USER_ROLE.TEACHER),
  validateRequest(createLessonSchema),
  lessonController.createLesson,
);

lessonRoute.get(
  "/",
  auth(USER_ROLE.TEACHER, USER_ROLE.STUDENT),
  lessonController.getAllLesson,
);

// Get single course
lessonRoute.get(
  "/:id",
  auth(USER_ROLE.TEACHER, USER_ROLE.STUDENT),
  lessonController.singleGetLesson,
);

// Update course
lessonRoute.patch(
  "/:id",
  auth(USER_ROLE.TEACHER),
  validateRequest(updateLessonSchema),
  lessonController.updateLesson,
);

// Delete course
lessonRoute.delete(
  "/:id",
  auth(USER_ROLE.TEACHER),
  lessonController.deleteLesson,
);
