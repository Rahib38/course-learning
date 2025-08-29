// follow.service.ts

import { Types } from "mongoose";
import { Follow } from "./feature.model";

const followTeacher = async (studentId: string, teacherId: string) => {
  // check already following
  const isFollowing = await Follow.findOne({ studentId, teacherId });
  if (isFollowing) {
    throw new Error("Already following this teacher");
  }

  const follow = await Follow.create({ studentId, teacherId });
  return follow;
};

const unfollowTeacher = async (studentId: string, teacherId: string) => {
  const result = await Follow.findOneAndDelete({ studentId, teacherId });
  if (!result) {
    throw new Error("Not following this teacher");
  }
  return result;
};

const getTeacherFollowers = async (teacherId: string) => {
  return await Follow.find({ teacherId: new Types.ObjectId(teacherId) }).populate("studentId");
};

const getStudentFollowing = async (studentId: string) => {
  return await Follow.find({ studentId }).populate("teacherId");
};

export const FollowService = {
  followTeacher,
  unfollowTeacher,
  getTeacherFollowers,
  getStudentFollowing,
};
