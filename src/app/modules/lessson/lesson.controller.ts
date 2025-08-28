import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { lessonService } from './lesson.service';

const createLesson = catchAsync(async (req, res) => {
//   const teacherId = req.user.id;
  const result = await lessonService.createLesson( req?.body);
  sendResponse(res, {
    success: true,
    message: "Lesson create successfully!",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});



const getAllLesson = catchAsync(async (req, res) => {
  const result = await lessonService.getAllLesson(req?.query);
  // console.log(result,"res")
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Lesson retrieved successfully",
    data: result,
  });
});

const singleGetLesson = catchAsync(async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const result = await lessonService.singleLessonIntoDB(id);
  sendResponse(res, {
    success: true,
    message: "Lesson retrieved successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const updateLesson = catchAsync(async (req, res) => {
  const id = req.params.id;
  // console.log(req.params);
  const body = req.body;
  const result = await lessonService.updateLessonIntoDB(id, body);
  sendResponse(res, {
    success: true,
    message: "Lesson update successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteLesson = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await lessonService.deleteLessonIntoDB(id);
  sendResponse(res, {
    success: true,
    message: "Lesson deleted successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});


export const lessonController ={
    createLesson,
    getAllLesson,
    singleGetLesson,
    updateLesson,
    deleteLesson
}