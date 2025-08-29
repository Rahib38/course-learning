import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProgressService } from "./progress.service";

// Mark Topic as Complete
const markTopicCompleteController = catchAsync(async (req, res) => {
  const studentId = req.user.id;
  const { courseId, lessonId, topicId } = req.body;

  const progress = await ProgressService.markTopicComplete(
    studentId,
    courseId,
    lessonId,
    topicId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic marked as complete",
    data: progress,
  });
});

// Get Student Progress
const getStudentProgressController = catchAsync(async (req, res) => {
  const studentId = req.user.id;
  const { courseId } = req.params;

  const progress = await ProgressService.getStudentProgress(
    studentId,
    courseId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Progress retrieved successfully",
    data: progress,
  });
});

export const progressController = {
  markTopicCompleteController,
  getStudentProgressController,
};
