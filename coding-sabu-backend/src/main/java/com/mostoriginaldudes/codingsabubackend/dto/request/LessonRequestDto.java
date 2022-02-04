package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class LessonRequestDto {
  private String title;
  private String description;
  private int price;
  private LocalDateTime createdAt;
  private LocalDateTime terminatedAt;
}
