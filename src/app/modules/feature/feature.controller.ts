// follow.controller.ts

import httpStatus from "http-status";
import { FollowService } from "./feature.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const followTeacher = catchAsync(async (req, res) => {
  const { teacherId } = req.body;
  const studentId = req.user.id; // from auth middleware

  const result = await FollowService.followTeacher(studentId, teacherId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Followed teacher successfully",
    data: result,
  });
});

const unfollowTeacher = catchAsync(async (req, res) => {
  const { teacherId } = req.body;
  const studentId = req.user.id;

  const result = await FollowService.unfollowTeacher(studentId, teacherId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Unfollowed teacher successfully",
    data: result,
  });
});

const getTeacherFollowers = catchAsync(async (req, res) => {
  const  teacherId  = req.user.id;
  const result = await FollowService.getTeacherFollowers(teacherId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Followers fetched successfully",
    data: result,
  });
});

const getStudentFollowing = catchAsync(async (req, res) => {
  const studentId = req.user.id;
  const result = await FollowService.getStudentFollowing(studentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Following list fetched successfully",
    data: result,
  });
});

export const FollowController = {
  followTeacher,
  unfollowTeacher,
  getTeacherFollowers,
  getStudentFollowing,
};
