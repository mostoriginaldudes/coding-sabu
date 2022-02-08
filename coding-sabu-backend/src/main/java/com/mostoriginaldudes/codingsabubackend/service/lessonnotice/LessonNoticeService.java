package com.mostoriginaldudes.codingsabubackend.service.lessonnotice;

import com.mostoriginaldudes.codingsabubackend.dto.request.LessonNoticeRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeListResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeResponseDto;

public interface LessonNoticeService {
  LessonNoticeListResponseDto getLessonNotices(int lessonId);
  LessonNoticeResponseDto createLessonNotice(int lessonId, LessonNoticeRequestDto requestDto);
  boolean isMyLesson(int userId, int lessonId);
}
