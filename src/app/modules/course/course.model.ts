import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    studentsEnrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    feedback: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

courseSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

courseSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const Course = model<ICourse>("Course", courseSchema);
