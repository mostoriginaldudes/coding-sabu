package com.mostoriginaldudes.codingsabubackend.service.lecture;

import com.mostoriginaldudes.codingsabubackend.dto.request.LectureRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LectureResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LectureUnitListResponseDto;

public interface LectureService {
  LectureUnitListResponseDto getLectureUnits(int lessonId);
  LectureResponseDto createLecture(int lessonId, LectureRequestDto requestDto);
}
