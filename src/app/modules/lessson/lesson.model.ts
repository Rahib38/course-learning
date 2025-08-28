import { model, Schema } from "mongoose";
import { ILesson } from "./lesson.interface";

const lessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: [true, "Lesson title is required"],
    },
    content: {
      type: String,
      required: [true, "Lesson content is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },
  { timestamps: true }
);

lessonSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

lessonSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};


export const Lesson = model<ILesson>("Lesson", lessonSchema);