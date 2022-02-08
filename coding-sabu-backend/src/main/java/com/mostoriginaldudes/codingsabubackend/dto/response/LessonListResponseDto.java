package com.mostoriginaldudes.codingsabubackend.dto.response;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class LessonListResponseDto {
  List<LessonDto> lessons;
}
