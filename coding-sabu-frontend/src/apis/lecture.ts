import httpRequest from 'apis/instance';
import { Lecture, LectureList, LectureRequestInfo } from 'types';

export const createLectureRequest = (lessonId: number, lectureInfo: LectureRequestInfo) =>
  httpRequest.post<Lecture>(`/lesson/${lessonId}/lecture`, lectureInfo);

export const fetchLectureRequest = (lessonId: number) =>
  httpRequest.get<LectureList>(`/lesson/${lessonId}/lecture`);
