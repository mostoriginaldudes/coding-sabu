package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class LessonRequestDto implements Serializable {
  private String title;
  private String description;
  private int price;
  private LocalDateTime terminatedAt;
  private MultipartFile imageThumbnail;
}
