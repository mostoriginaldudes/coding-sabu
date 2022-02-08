package com.mostoriginaldudes.codingsabubackend.dto.response;

import com.mostoriginaldudes.codingsabubackend.dto.LessonNoticeDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class LessonNoticeListResponseDto {
  private final List<LessonNoticeDto> lessonNotices;
}
