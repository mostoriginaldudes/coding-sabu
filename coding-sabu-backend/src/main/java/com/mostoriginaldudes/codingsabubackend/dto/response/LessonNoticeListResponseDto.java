package com.mostoriginaldudes.codingsabubackend.dto.response;

import com.mostoriginaldudes.codingsabubackend.dto.LessonNoticeDto;

import java.util.List;

public class LessonNoticeListResponseDto {
  private final List<LessonNoticeDto> lessonNotices;

  public LessonNoticeListResponseDto(List<LessonNoticeDto> lessonNotices) {
    this.lessonNotices = lessonNotices;
  }

  public List<LessonNoticeDto> getLessonNotices() {
    return lessonNotices;
  }
}
