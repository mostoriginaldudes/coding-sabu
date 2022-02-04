package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
  private final LessonRepository lessonRepository;

  @Override
  public List<LessonDto> getAllLessons(int page) {
    List<LessonDto> lessons = lessonRepository.getAllLessons(page);
    return lessons;
  }

  @Override
  public LessonResponseDto getLesson(int id) {
    LessonDto lesson = lessonRepository.getLessonById(id);

    if(lesson == null) {
      return null;
    }

    return LessonResponseDto.builder()
      .id(id)
      .teacherId(lesson.getTeacherId())
      .title(lesson.getTitle())
      .description(lesson.getDescription())
      .price(lesson.getPrice())
      .createdAt(lesson.getCreatedAt())
      .terminatedAt(lesson.getTerminatedAt())
      .build();
  }

  @Override
  @Transactional
  public LessonResponseDto createLesson(LessonRequestDto requestDto, int teacherId) {
    LessonDto lesson = LessonDto.builder()
        .teacherId(teacherId)
        .title(requestDto.getTitle())
        .description(requestDto.getDescription())
        .price(requestDto.getPrice())
        .createdAt(LocalDateTime.now())
        .terminatedAt(requestDto.getTerminatedAt())
        .build();

    lessonRepository.createLesson(lesson);
    return getLesson(lesson.getId());
  }

  @Override
  @Transactional
  public LessonResponseDto registerLesson(int lessonId, int studentId) {
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

  @Override
  public List<UserDto> getStudentsInMyClass(int lessonId, int teacherId) {
    return lessonRepository.getStudentsInMyLessonByTeacherId(lessonId, teacherId);
  }
}
