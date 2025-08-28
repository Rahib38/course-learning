import { model, Schema } from "mongoose";
import { ITopic } from "./topic.interface";

const topicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: [true, "Topic title is required"] },
    content: { type: String, required: [true, "Topic content is required"] },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    quiz: {
      question: { type: String },
      options: [{ type: String }],
      correctAnswer: { type: String },
    },
  },
  { timestamps: true }
);

export const Topic = model<ITopic>("Topic", topicSchema);