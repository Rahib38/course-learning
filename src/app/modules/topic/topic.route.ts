import { Router } from "express";
import { topicController } from "./topic.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

export const topicRoutes = Router()

topicRoutes.post('/create-topic',auth(USER_ROLE.TEACHER),topicController.createTopic)

topicRoutes.get("/:id",topicController.getTopicsByLesson)