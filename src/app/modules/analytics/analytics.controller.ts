import httpStatus from "http-status";

import { analyticsService } from "./analytics.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getCourseAnalytics = catchAsync(async (req, res) => {
  const teacherId  = req.user.id;

  const result = await analyticsService.getCourseAnalytics(teacherId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course analytics fetched successfully",
    data: result,
  });
});

export const analyticsController = {
  getCourseAnalytics,
};
