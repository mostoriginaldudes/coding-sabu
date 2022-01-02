package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;

import java.util.List;

public interface LessonService {
  List<LessonDto> getAllLessons(int page);
  LessonDto getLessonById(int lessonId);
}
