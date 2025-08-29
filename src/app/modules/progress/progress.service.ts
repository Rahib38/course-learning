import { Types } from "mongoose";
import { Progress } from "./progress.model";

const markTopicComplete = async (
  studentId: string,
  courseId: string,
  lessonId: string,
  topicId: string,
) => {
  let progress = await Progress.findOne({ studentId, courseId });

  if (!progress) {
    progress = await Progress.create({
      studentId,
      courseId,
      lessonsCompleted: [],
    });
  }

  // Find lesson progress safely
  const lessonProgress = progress.lessonsCompleted.find(
    (l) => l.lessonId.toString() === lessonId.toString(),
  );

  if (!lessonProgress) {
    progress.lessonsCompleted.push({
      lessonId: new Types.ObjectId(lessonId),
      topicsCompleted: [new Types.ObjectId(topicId)],
    });
  } else {
    // check if topic already marked
    const topicExists = lessonProgress.topicsCompleted.some(
      (t) => t.toString() === topicId.toString(),
    );
    if (!topicExists) {
      lessonProgress.topicsCompleted.push(new Types.ObjectId(topicId));
    }
  }

  await progress.save();
  return progress;
};

const getStudentProgress = async (studentId: string, courseId: string) => {
    const progress = await Progress.findOne({studentId, courseId})
    return progress || {lessonsCompleted:[]}
};

export const ProgressService = {
  markTopicComplete,
  getStudentProgress,
};
