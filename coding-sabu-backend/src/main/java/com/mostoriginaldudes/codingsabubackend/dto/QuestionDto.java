package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class QuestionDto {
  private int id;
  private int lessonId;
  private int writerId;
  private String title;
  private String article;
}
