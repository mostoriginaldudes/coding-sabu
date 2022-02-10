export interface Lesson {
  id: number;
  teacherName: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  terminatedAt: Date | null;
  thumbnailUrl: string;
  studentCount: number;
}

export type HudStatus = 'success' | 'fail';

export type LessonFormAction =
  | HTMLInputElement
  | { name: 'description'; value: string };

export interface LessonListResponse {
  lessons: Lesson[];
}

export interface LessonResponse {
  lesson: Lesson;
}
