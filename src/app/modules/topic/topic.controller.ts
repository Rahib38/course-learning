import httpStatus from "http-status";
import { TopicService } from "./topic.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Create Topic
export const createTopic = catchAsync(async (req, res) => {
//   const { title, content, lesson, quiz } = req.body;

  const topic = await TopicService.createTopic(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Topic created successfully",
    data: topic,
  });
});

// Get Topics by Lesson
export const getTopicsByLesson = catchAsync(async (req, res) => {
  const { id } = req.params;

  const topics = await TopicService.getTopicsByLesson(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topics retrieved successfully",
    data: topics,
  });
});

export const topicController = {
  createTopic,
  getTopicsByLesson,
};
