import httpRequest from 'apis/instance';
import { Lesson, LessonListResponse, LessonResponse } from 'types';

export const fetchLessonListRequest = () =>
  httpRequest.get<LessonListResponse>('/lesson/all', { withCredentials: true });

export const fetchMyJoiningLessonListRequest = () =>
  httpRequest.get<LessonListResponse>('lesson/me');

export const fetchMyTeachingLessonListRequest = () =>
  httpRequest.get<LessonListResponse>('/lesson/teachings');

export const fetchOneLessonRequest = (id: number) => httpRequest.get<Lesson>(`/lesson/${id}`);

export const createLessonRequest = (lesson: FormData) =>
  httpRequest.post<Lesson>('/lesson', lesson);

export const joinLessonRequest = (lessonId: number, userId: number) =>
  httpRequest.post<LessonResponse>(`/lesson/${lessonId}/student`, {
    studentId: userId
  });
