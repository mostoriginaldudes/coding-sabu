import httpRequest from 'apis/instance';
import { Lecture, LectureList, LectureRequestInfo } from 'types';

export const createLecture = (
  lessonId: number,
  lectureInfo: LectureRequestInfo
) => httpRequest.post<Lecture>(`/lesson/${lessonId}/lecture`, lectureInfo);

export const fetchLectureUnits = (lessonId: number) =>
  httpRequest.get<LectureList>(`/lesson/${lessonId}/lecture`);
