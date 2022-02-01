package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@NoArgsConstructor
@ToString
public class QuestionRequestDto {
  private int lessonId;
  private int writerId;
  private String title;
  private String article;
}
