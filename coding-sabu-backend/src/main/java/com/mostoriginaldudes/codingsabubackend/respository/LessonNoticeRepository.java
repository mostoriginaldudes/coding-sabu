package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.LessonNoticeDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonNoticeRequestDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface LessonNoticeRepository {
  List<LessonNoticeDto> getLessonNoticeByLessonId(int lessonId);
  int createLessonNotice(LessonNoticeRequestDto lessonNoticeRequestDto);
}
