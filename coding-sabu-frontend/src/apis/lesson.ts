import httpRequest from 'apis/instance';
import { LessonListResponse, LessonResponse } from 'types';

export const fetchLessonList = (): Promise<LessonListResponse> =>
  httpRequest.get('/lesson/all');

export const fetchMyLessonList = (): Promise<LessonListResponse> =>
  httpRequest.get('lesson/me');

export const fetchLesson = (id: string): Promise<LessonResponse> =>
  httpRequest.get(`/lesson/${id}`);
