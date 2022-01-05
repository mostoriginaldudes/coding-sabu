package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.respository.LessonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
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
  public LessonDto getLesson(int id) {
    return lessonRepository.getLessonById(id);
  }

  @Override
  @Transactional
  public LessonDto createLesson(LessonDto lesson) {
    lessonRepository.createLesson(lesson);
    int lessonId = lesson.getId();

    return getLesson(lessonId);
  }

  @Override
  @Transactional
  public LessonDto registerLesson(int lessonId, int studentId) {
    try {
      lessonRepository.registerStudentToLesson(lessonId, studentId);

      return getLesson(lessonId);
    } catch (RuntimeException runtimeException) {
      runtimeException.printStackTrace();
      throw runtimeException;
    }
  }

  @Override
  public List<LessonDto> getMyLessons(int userId) {
    List<LessonDto> lessons = lessonRepository.getMyLessonsByUserId(userId);

    return lessons;
  }
}
