package com.mostoriginaldudes.codingsabubackend.dto.response;

import lombok.*;

@Getter @Setter
public class QuestionResponseDto {
  private int id;
  private int lessonId;
  private int writerId;
  private String title;
  private String article;
}
