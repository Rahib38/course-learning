import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const teacherId = req.user.id;
  const result = await courseService.createCourse(teacherId, req?.body);
  sendResponse(res, {
    success: true,
    message: "Course create successfully!",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});


export const courseController ={
    createCourse
}