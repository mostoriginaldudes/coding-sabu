package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.respository.LessonRepository;

import java.util.List;

public class LessonServiceImpl implements LessonService {
  private final LessonRepository lessonRepository;

  public LessonServiceImpl(LessonRepository lessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  @Override
  public List<LessonDto> getAllLessons(int page) {
    return lessonRepository.getAllLessons(page);
  }

  @Override
  public LessonDto getLessonById(int lessonId) {
    return lessonRepository.getLessonById(lessonId);
  }
}
