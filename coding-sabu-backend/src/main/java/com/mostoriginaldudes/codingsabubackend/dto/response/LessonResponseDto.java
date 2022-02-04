package com.mostoriginaldudes.codingsabubackend.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class LessonResponseDto {
  private final int id;
  private final int teacherId;
  private final String title;
  private final String description;
  private final int price;
  private final LocalDateTime createdAt;
  private final LocalDateTime terminatedAt;
}