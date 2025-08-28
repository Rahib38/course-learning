import  httpStatus  from 'http-status';
import AppError from "../../errors/AppError";
import { Lesson } from "../lessson/lesson.model";
import { Topic } from "./topic.model";

const createTopic = async (payload: {
  title: string;
  content: string;
  lesson: string;
  quiz?: string;
}) => {
  const topic = await Topic.create(payload);

  // Push topic into Lesson
  await Lesson.findByIdAndUpdate(payload.lesson, {
    $push: { topics: topic._id },
  });

  return topic;
};

const getTopicsByLesson = async (_id: string) => {
  const topics = await Topic.findById(_id );

  if(!topics){
    throw new AppError(httpStatus.NOT_FOUND,"Topic Not found")
  }
  return topics;
};

export const TopicService = {
  createTopic,
  getTopicsByLesson,
};
