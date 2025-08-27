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

export const courseService = {
  createCourse,
};
