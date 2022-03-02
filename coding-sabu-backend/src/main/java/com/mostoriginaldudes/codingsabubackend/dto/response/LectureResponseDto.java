package com.mostoriginaldudes.codingsabubackend.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class LectureResponseDto {
  private final int id;
  private final int lessonId;
  private final String unit;
  private final String content;
}
