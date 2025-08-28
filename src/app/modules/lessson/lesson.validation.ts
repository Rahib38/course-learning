import { z } from "zod";

// Create Lesson Validation
export const createLessonSchema = z.object({
  title: z.string({ required_error: "Lesson title is required" }),
  content: z.string({ required_error: "Lesson content is required" }),
  course: z.string({ required_error: "Course ID is required" }), // ObjectId as string
  topics: z.array(z.string()).optional(), // ObjectIds as strings
});

// Update Lesson Validation
export const updateLessonSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  course: z.string().optional(),
  topics: z.array(z.string()).optional(),
});
