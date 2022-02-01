package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class QuestionRequestDto {
  private int lessonId;
  private int writerId;
  private String title;
  private String article;
}
