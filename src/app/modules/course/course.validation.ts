import { z } from "zod";

export const createCourseValidation = z.object({
  title: z.string({
    required_error: "Course title is required",
  }),
  description: z.string({
    required_error: "Course description is required",
  }),
  teacher: z.string({
    required_error: "Teacher ID is required",
  }),
  likes: z.number().optional(), // default 0 hobe model e
  studentsEnrolled: z.array(z.string()).optional(),
  feedback: z.array(z.string()).optional(),
});

export const updateCourseValidation = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  teacher: z.string().optional(),
  likes: z.number().optional(),
  studentsEnrolled: z.array(z.string()).optional(),
  feedback: z.array(z.string()).optional(),
});
