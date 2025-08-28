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

const getAllCourse = catchAsync(async (req, res) => {
  const result = await courseService.getAllCourse(req?.query);
  // console.log(result,"res")
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course retrieved successfully",
    data: result,
  });
});

const singleGetCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const result = await courseService.singleCourseIntoDB(id);
  sendResponse(res, {
    success: true,
    message: "Course retrieved successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  // console.log(req.params);
  const body = req.body;
  const result = await courseService.updateCourseIntoDB(id, body);
  sendResponse(res, {
    success: true,
    message: "Course update successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await courseService.deleteCourseIntoDB(id);
  sendResponse(res, {
    success: true,
    message: "Course deleted successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourse,
  singleGetCourse,
  updateCourse,
  deleteCourse,
};
