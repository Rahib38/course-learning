import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { courseController } from "./course.controller";
import { createCourseValidation, updateCourseValidation } from "./course.validation";

const courseRoute = Router();

// Create course
courseRoute.post(
  "/",
  auth(USER_ROLE.TEACHER),
  validateRequest(createCourseValidation),
  courseController.createCourse,
);

// Get all courses
courseRoute.get("/", auth(USER_ROLE.TEACHER, USER_ROLE.STUDENT), courseController.getAllCourse);

// Get single course
courseRoute.get("/:id", auth(USER_ROLE.TEACHER, USER_ROLE.STUDENT), courseController.singleGetCourse);

// Update course
courseRoute.patch(
  "/:id",
  auth(USER_ROLE.TEACHER),
  validateRequest(updateCourseValidation),
  courseController.updateCourse,
);

// Delete course
courseRoute.delete("/:id", auth(USER_ROLE.TEACHER), courseController.deleteCourse);

export default courseRoute;
