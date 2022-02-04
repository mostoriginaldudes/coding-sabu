package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class LessonDto {
  @Setter
  private int id;
  private int teacherId;
  private String title;
  private String description;
  private int price;
  private LocalDateTime createdAt;
  private LocalDateTime terminatedAt;

  @Builder
  public LessonDto(
    int teacherId,
    String title,
    String description,
    int price,
    LocalDateTime createdAt,
    LocalDateTime terminatedAt
  ) {
    this.teacherId = teacherId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.createdAt = createdAt;
    this.terminatedAt = terminatedAt;
  }
}
