// follow.routes.ts
import express from "express";
import auth from "../../middlewares/auth";
import { FollowController } from "./feature.controller";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// student follow/unfollow teacher
router.post("/", auth(USER_ROLE.STUDENT), FollowController.followTeacher);
router.post("/unfollow", auth(USER_ROLE.STUDENT), FollowController.unfollowTeacher);

// get teacher followers
router.get("/followers", auth(USER_ROLE.TEACHER), FollowController.getTeacherFollowers);

// get student following list
router.get("/following", auth(USER_ROLE.STUDENT), FollowController.getStudentFollowing);

export const FollowRoutes = router;
