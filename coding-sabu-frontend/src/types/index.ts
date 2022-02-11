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

export interface User {
  id: number;
  email: string;
  userType: 'teacher' | 'student';
  nickname: string;
  phoneNum: string;
  description: string;
  profileImage: string | null;
}

export type LoginInfo = Pick<User, 'email'> & Record<'password', string>;

export type SignupInfo = Pick<LoginInfo, 'password'> & Omit<User, 'id'>;
