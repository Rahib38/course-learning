import httpStatus from "http-status";
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
  const courseQuery =  new QueryBuilder(
    Course.find().populate("teacher", "name email"), // fixed space
    query,
  )
    .search(["title", "description"]) // fixed field name
    .filter()
    .sort()
    .paginate();

  const result = await courseQuery.modelQuery.exec();
  const meta = await courseQuery.getMetaData();

  return {
    meta: meta ,
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

export const courseService = {
  createCourse,
  getAllCourse,
  singleCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
};
