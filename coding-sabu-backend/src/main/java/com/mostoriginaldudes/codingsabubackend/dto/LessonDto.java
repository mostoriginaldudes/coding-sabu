package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class LessonDto {
  private int id;
  private int teacherId;
  private String title;
  private String description;
  private int price;
  private LocalDateTime createdAt;
  private LocalDateTime terminatedAt;
}
