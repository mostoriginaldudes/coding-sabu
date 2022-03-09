package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class LessonDto {

  @Setter
  private int id;
  private int teacherId;
  private String title;
  private String description;
  private int price;
  private LocalDateTime createdAt;
  private String thumbnailUrl;

  @Builder
  public LessonDto(
    int teacherId,
    String title,
    String description,
    int price,
    LocalDateTime createdAt,
    String thumbnailUrl
  ) {
    this.teacherId = teacherId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.createdAt = createdAt;
    this.thumbnailUrl = thumbnailUrl;
  }
}
