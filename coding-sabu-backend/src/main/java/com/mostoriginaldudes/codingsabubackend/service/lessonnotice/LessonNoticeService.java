package com.mostoriginaldudes.codingsabubackend.service.lessonnotice;

import com.mostoriginaldudes.codingsabubackend.dto.LessonNoticeDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonNoticeRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeResponseDto;

import java.util.List;

public interface LessonNoticeService {
  List<LessonNoticeDto> getLessonNotices(int lessonId);
  LessonNoticeResponseDto createLessonNotice(int lessonId, LessonNoticeRequestDto lessonNoticeRequestDto);
  boolean isMyLesson(int userId, int lessonId);
}
