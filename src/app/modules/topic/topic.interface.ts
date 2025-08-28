import { Types } from "mongoose";

export interface ITopic {
  title: string;
  content: string;
  lesson: Types.ObjectId;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
}