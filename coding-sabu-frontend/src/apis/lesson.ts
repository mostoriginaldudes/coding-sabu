import httpRequest from 'apis/instance';
import { Lesson, LessonListResponse, LessonResponse } from 'types';

export const fetchLessonList = () =>
  httpRequest.get<LessonListResponse>('/lesson/all', { withCredentials: true });

export const fetchMyJoiningLessonList = () =>
  httpRequest.get<LessonListResponse>('lesson/me');

export const fetchOneLesson = (id: number) =>
  httpRequest.get<Lesson>(`/lesson/${id}`);

export const createLesson = (lesson: FormData) =>
  httpRequest.post<Lesson>('/lesson', lesson);

export const joinLesson = (lessonId: number, userId: number) =>
  httpRequest.post<LessonResponse>(`/lesson/${lessonId}/student`, {
    studentId: userId
  });

export const fetchMyTeachingLessonList = () =>
  httpRequest.get<LessonListResponse>('/lesson/teachings');
