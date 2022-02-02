package com.mostoriginaldudes.codingsabubackend.dto.response;

public class LessonNoticeResponseDto {
  private final int id;
  private final int lessonId;
  private final String lessonNoticeArticle;

  public static class Builder {
    private int id;
    private int lessonId;
    private String lessonNoticeArticle;

    public Builder id(int id) {
      this.id = id;
      return this;
    }

    public Builder lessonId(int lessonId) {
      this.lessonId = lessonId;
      return this;
    }

    public Builder lessonNoticeArticle (String lessonNoticeArticle) {
      this.lessonNoticeArticle = lessonNoticeArticle;
      return this;
    }

    public LessonNoticeResponseDto builder() {
      return new LessonNoticeResponseDto(this);
    }
  }

  private LessonNoticeResponseDto(Builder builder) {
    id = builder.id;
    lessonId = builder.lessonId;
    lessonNoticeArticle = builder.lessonNoticeArticle;
  }

  public int getId() {
    return id;
  }

  public int getLessonId() {
    return lessonId;
  }

  public String getLessonNoticeArticle() {
    return lessonNoticeArticle;
  }
}
