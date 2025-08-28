import httpStatus from "http-status";

import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Lesson } from "./lesson.model";

const createLesson = async (payload: {
  title: string;
  content: string;
  course: string;
}) => {
  const { title, content, course } = payload;

  const lesson = await Lesson.create({
    title,
    content,
    course,
  });
  return lesson;
};

const getAllLesson = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Lesson.find()
    //   .populate("teacher", "name email")
      .populate("course", "title description"), // fixed space
    query,
  )
    .search(["title", "content"]) // fixed field name
    .filter()
    .sort()
    .paginate();

  const result = await courseQuery.modelQuery.exec();
  const meta = await courseQuery.getMetaData();

  return {
    meta: meta,
    courses: result, // meaningful name
  };
};

const singleLessonIntoDB = async (_id: string) => {
  const result = await Lesson.findById(_id)
    // .populate("teacher", " name email")
    .populate("course", "title description");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }
  return result;
};

const updateLessonIntoDB = async (
  _id: string,
  payload: { title: string; description: string },
) => {
  const result = await Lesson.findByIdAndUpdate(_id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }
  return result;
};

const deleteLessonIntoDB = async (_id: string) => {
  const result = await Lesson.findByIdAndDelete(_id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson already deleted!");
  }
  return result;
};

export const lessonService = {
  createLesson,
  getAllLesson,
  singleLessonIntoDB,
  updateLessonIntoDB,
  deleteLessonIntoDB,
};
