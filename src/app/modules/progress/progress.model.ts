import { model, Schema } from "mongoose";
import { IProgress } from "./progress.interface";

const progressSchema = new Schema<IProgress>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lessonsCompleted: [
      {
        lessonId: { type: Schema.Types.ObjectId, ref: "Lesson" },
        topicsCompleted: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
      },
    ],
  },
  { timestamps: true }
);

export const Progress = model<IProgress>("Progress", progressSchema);