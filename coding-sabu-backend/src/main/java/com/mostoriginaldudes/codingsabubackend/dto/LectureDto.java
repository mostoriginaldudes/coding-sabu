package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
public class LectureDto {

  @Setter
  private int id;
  private int lessonId;
  private String unit;
  private String content;

  @Builder
  public LectureDto(int lessonId, String unit, String content) {
    this.lessonId = lessonId;
    this.unit = unit;
    this.content = content;
  }
}
