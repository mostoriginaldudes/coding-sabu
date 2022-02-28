package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
public class LessonRequestDto {
  private int teacherId;
  private String title;
  private String description;
  private int price;
  private MultipartFile imageThumbnail;
}
