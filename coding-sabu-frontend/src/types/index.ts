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
  profileImage: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface SignupFormInfo {
  email: string;
  password: string;
  passwordCheck: string;
  userType: 'teacher' | 'student';
  nickname: string;
  phoneNum: string;
  description: string;
}

export interface SignupInfo {
  email: string;
  password: string;
  userType: 'teacher' | 'student';
  nickname: string;
  phoneNum: string;
  description: string;
}

export interface EditUserInfo {
  readonly id: number;
  readonly email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phoneNum: string;
  description: string;
  profileImage: File;
}
