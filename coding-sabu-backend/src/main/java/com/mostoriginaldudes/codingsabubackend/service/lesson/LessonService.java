package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;

import java.util.List;

public interface LessonService {
  List<LessonDto> getAllLessons(int page);
  LessonDto getLesson(int id);
  LessonDto createLesson(LessonDto lesson);
  LessonDto registerLesson(int lessonId, int studentId);
  List<LessonDto> getMyLessons(int userId);
  List<UserDto> getStudentsInMyClass(int lessonId, int teacherId);
}
