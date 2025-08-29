import { model, Schema, Types } from "mongoose";
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
    studentsEnrolled: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [], // ✅ ensure always array
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [], // ✅ ensure always array
    },
    feedback: {
      type: [
        {
          studentId: { type: Types.ObjectId, ref: "User" },
          comment: String,
        },
      ],
      default: [], // ✅ ensure always array
    },
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
