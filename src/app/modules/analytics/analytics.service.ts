import { Types } from "mongoose";
import { Course } from "../course/course.model";
import { Progress } from "../progress/progress.model";

const getCourseAnalytics = async (teacher: string) => {
  const courses = await Course.find({ teacher: new Types.ObjectId(teacher) });

  const analytics = await Promise.all(
    courses.map(async (course) => {
      // ✅ safe checks
      const studentCount = course.studentsEnrolled?.length || 0;
      const likesCount = course.likes?.length || 0;
      const feedbackCount = course.feedback?.length || 0;

      const progresses = await Progress.find({ courseId: course._id });

      const totalTopicsCompleted = progresses.reduce((acc, p) => {
        p.lessonsCompleted?.forEach((lesson) => {
          acc += lesson.topicsCompleted?.length || 0;
        });
        return acc;
      }, 0);

      return {
        courseId: course._id,
        title: course.title,
        studentCount,
        likesCount,
        feedbackCount,
        totalTopicsCompleted,
      };
    }),
  );

  return analytics;
};

export const analyticsService = {
  getCourseAnalytics,
};
