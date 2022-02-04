package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonResponseDto;

import java.util.List;

public interface LessonService {
  List<LessonDto> getAllLessons(int page);
  LessonResponseDto getLesson(int id);
  LessonResponseDto createLesson(LessonRequestDto requestDto, int teacherId);
  LessonResponseDto registerLesson(int lessonId, int studentId);
  List<LessonDto> getMyLessons(int userId);
  List<UserDto> getStudentsInMyClass(int lessonId, int teacherId);
}
