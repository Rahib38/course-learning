import { model, Schema } from "mongoose";
import { IFollow } from "./feature.interface";

const followSchema = new Schema<IFollow>(
  {
    studentId: { type:Schema.Types.ObjectId, ref: "User", required: true },
    teacherId: { type:Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Follow = model<IFollow>("Follow", followSchema);