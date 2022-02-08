package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonListResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LessonService {
  LessonListResponseDto getAllLessons(int page);
  LessonResponseDto getLesson(int id);
  String uploadLessonThumbnail(MultipartFile multipartFile);
  LessonResponseDto createLesson(LessonRequestDto requestDto, int teacherId);
  LessonResponseDto registerLesson(int lessonId, int studentId);
  LessonListResponseDto getMyLessons(int userId);
  List<UserDto> getStudentsInMyClass(int lessonId, int teacherId);
}
