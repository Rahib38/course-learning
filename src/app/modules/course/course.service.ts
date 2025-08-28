/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Course } from "./course.model";

const createCourse = async (
  teacherId: string,
  payload: { title: string; description: string },
) => {
  const { title, description } = payload;

  const course = await Course.create({
    title,
    description,
    teacher: teacherId,
  });
  return course;
};
const getAllCourse = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find({}).populate("teacher", "name email"), // fixed space
    query,
  )
    .search(["title", "description"]) // fixed field name
    .filter()
    .sort()
    .paginate();

  const result = await courseQuery.modelQuery.exec();
  console.log(result)
  const meta = await courseQuery.getMetaData();

  return {
    meta: meta,
    courses: result, // meaningful name
  };
};

const singleCourseIntoDB = async (_id: string) => {
  const result = await Course.findById(_id).populate("teacher", " name email");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  return result;
};

const updateCourseIntoDB = async (
  _id: string,
  payload: { title: string; description: string },
) => {
  const result = await Course.findByIdAndUpdate(_id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  return result;
};

const deleteCourseIntoDB = async (_id: string) => {
  const result = await Course.findByIdAndDelete(_id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Course already deleted!");
  }
  return result;
};

const enrollCourse = async (courseId: string, studentId: string) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Check if already enrolled
  if (course.studentsEnrolled.includes(studentId as any)) {
    throw new AppError(httpStatus.NOT_FOUND, "Already enrolled");
  }

  // Add student to course
  course.studentsEnrolled.push(studentId as any);
  await course.save();

  return course;
};

const toggleLikeCourse = async (courseId: string, studentId: string) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found!");
  }
  const alreadyLiked = course.likes.includes(new Types.ObjectId(studentId));

  if (alreadyLiked) {
    course.likes = course.likes.filter(
      (id) => id.toString() !== studentId.toString(),
    );
  } else {
    course.likes.push(new Types.ObjectId(studentId));
  }
  await course.save();
  return course;
};

const addFeedback = async (
  courseId: string,
  studentId: string,
  comment: string,
) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found!");
  }

  course.feedback.push({ studentId: new Types.ObjectId(studentId), comment });

  await course.save();
  return course;
};

export const courseService = {
  createCourse,
  getAllCourse,
  singleCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
  enrollCourse,
  toggleLikeCourse,
  addFeedback,
};
