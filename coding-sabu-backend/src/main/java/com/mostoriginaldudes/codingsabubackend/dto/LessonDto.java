package com.mostoriginaldudes.codingsabubackend.dto;

import java.time.LocalDateTime;

public class LessonDto {
  private int id;
  private String teacher;
  private int studentCount;
  private String title;
  private String lessonImage;
  private LocalDateTime createdAt;
  private int price;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getTeacher() {
    return teacher;
  }

  public void setTeacher(String teacher) {
    this.teacher = teacher;
  }

  public int getStudentCount() {
    return studentCount;
  }

  public void setStudentCount(int studentCount) {
    this.studentCount = studentCount;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
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

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }
}
