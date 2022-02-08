package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LessonRepository {
  List<LessonDto> getAllLessons(int page);
  LessonDto getLessonById(int id);
  int createLesson(LessonDto lesson);
  int registerStudentToLesson(int lessonId, int studentId);
  List<LessonDto> getMyLessonsByUserId(int userId);
  List<UserDto> getStudentsInMyLessonByTeacherId(int lessonId, int teacherId);
}
