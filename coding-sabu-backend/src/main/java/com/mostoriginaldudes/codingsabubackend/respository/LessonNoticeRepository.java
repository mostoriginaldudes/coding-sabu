package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.LessonNoticeDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LessonNoticeRepository {
  List<LessonNoticeDto> getLessonNoticeByLessonId(int lessonId);
  int createLessonNotice(LessonNoticeDto lessonNoticeDto);
}
