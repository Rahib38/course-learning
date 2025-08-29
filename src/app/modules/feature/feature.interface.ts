import { Types } from "mongoose";


export interface IFollow  {
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
}