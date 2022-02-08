package com.mostoriginaldudes.codingsabubackend.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class LessonResponseDto {
  private final int id;
  private final int teacherId;
  private final String title;
  private final String description;
  private final int price;
  private final LocalDateTime createdAt;
  private final LocalDateTime terminatedAt;
  private final String thumbnailUrl;
}
