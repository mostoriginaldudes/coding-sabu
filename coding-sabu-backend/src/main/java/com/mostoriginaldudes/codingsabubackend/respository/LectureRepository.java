package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.LectureDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LectureRepository {
  List<LectureDto> fetchLecture(int lessonId);
  void createLecture(LectureDto lecture);
}
