package com.mostoriginaldudes.codingsabubackend.dto;

import java.time.LocalDateTime;

public class LessonDto {
  private int lessonId;
  private int teacherId;
  private String title;
  private String description;
  private int price;
  private String lessonImage;
  private LocalDateTime createdAt;
  private LocalDateTime terminatedAt;

  public int getLessonId() {
    return lessonId;
  }

  public void setLessonId(int lessonId) {
    this.lessonId = lessonId;
  }

  public int getTeacherId() {
    return teacherId;
  }

  public void setTeacherId(int teacherId) {
    this.teacherId = teacherId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }

  public String getLessonImage() {
    return lessonImage;
  }

  public void setLessonImage(String lessonImage) {
    this.lessonImage = lessonImage;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getTerminatedAt() {
    return terminatedAt;
  }

  public void setTerminatedAt(LocalDateTime terminatedAt) {
    this.terminatedAt = terminatedAt;
  }
}
