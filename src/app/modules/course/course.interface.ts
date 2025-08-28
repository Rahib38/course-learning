import { Types } from "mongoose";

export interface IFeedback {
  studentId: Types.ObjectId;
  comment: string;
}

export interface ICourse {
  title: string;
  description: string;
  teacher: Types.ObjectId;
  studentsEnrolled: Types.ObjectId[];
  likes: Types.ObjectId[];  
  feedback: IFeedback[];
}
