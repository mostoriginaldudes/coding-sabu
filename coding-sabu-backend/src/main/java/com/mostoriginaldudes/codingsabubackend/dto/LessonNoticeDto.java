package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class LessonNoticeDto {
  @Setter
  private int id;
  private int lessonId;
  private String lessonNoticeArticle;

  @Builder
  public LessonNoticeDto(int id, int lessonId, String lessonNoticeArticle) {
    this.id = id;
    this.lessonId = lessonId;
    this.lessonNoticeArticle = lessonNoticeArticle;
  }
}
