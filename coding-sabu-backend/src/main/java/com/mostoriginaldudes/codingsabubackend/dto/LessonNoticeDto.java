package com.mostoriginaldudes.codingsabubackend.dto;

public class LessonNoticeDto {
  private int id;
  private int lessonId;
  private String lessonNoticeArticle;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getLessonId() {
    return lessonId;
  }

  public void setLessonId(int lessonId) {
    this.lessonId = lessonId;
  }

  public String getLessonNoticeArticle() {
    return lessonNoticeArticle;
  }

  public void setLessonNoticeArticle(String lessonNoticeArticle) {
    this.lessonNoticeArticle = lessonNoticeArticle;
  }
}
