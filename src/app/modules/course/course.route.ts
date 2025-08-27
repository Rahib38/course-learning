import { Router } from "express";
import { courseController } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const courseRoute = Router()

courseRoute.post('/create-course', auth(USER_ROLE.TEACHER),courseController.createCourse)

export default courseRoute