package com.mostoriginaldudes.codingsabubackend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class QuestionResponseDto {
  private int id;
  private int lessonId;
  private int writerId;
  private String title;
  private String article;
}
