package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface LessonRepository {
  List<LessonDto> getAllLessons(int page);
  LessonDto getLessonById(int id);
  int createLesson(LessonDto lesson);
  int registerStudentToLesson(int lessonId, int studentId);
  List<LessonDto> getMyLessonsByUserId(int userId);
}
