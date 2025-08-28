import { Types } from "mongoose";

export interface ILesson {
  title: string;
  content: string;
  course: Types.ObjectId;
  topics: Types.ObjectId[];
}
