package com.mostoriginaldudes.codingsabubackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class LessonListResponseDto {
  List<LessonResponseDto> lessons;
}
