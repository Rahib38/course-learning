import { Types } from "mongoose";

export interface ICourse {
  title: string;
  description: string;
  teacher: Types.ObjectId;
  likes: number;
  studentsEnrolled: Types.ObjectId[];
  feedback: string[];
}
