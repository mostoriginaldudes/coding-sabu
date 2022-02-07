export interface Lesson {
  lessonId: number;
  lessonThumbnailPath: string;
  lessonTitle: string;
  lessonDescription: string;
  teacher: string;
  studentCount: number;
  lessonPrice: number;
}

export type HudStatus = 'success' | 'fail';

export type LessonFormAction =
  | HTMLInputElement
  | { name: 'description'; value: string };
