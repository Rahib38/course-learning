import { Types } from "mongoose";

export interface IProgress {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  lessonsCompleted: {
    lessonId: Types.ObjectId;
    topicsCompleted: Types.ObjectId[];
  }[];
}