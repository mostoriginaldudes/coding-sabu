package com.mostoriginaldudes.codingsabubackend.service.lecture;

import com.mostoriginaldudes.codingsabubackend.dto.LectureDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LectureRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LectureResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LectureUnitListResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LectureServiceImpl implements LectureService {

  private final LectureRepository lectureRepository;

  @Override
  public LectureUnitListResponseDto getLectureUnits(int lessonId) {
    List<LectureDto> lectures = lectureRepository.fetchLecture(lessonId);
    return new LectureUnitListResponseDto(lectures);
  }

  @Override
  @Transactional
  public LectureResponseDto createLecture(int lessonId, LectureRequestDto requestDto) {
    LectureDto lecture = LectureDto.builder()
      .lessonId(lessonId)
      .unit(requestDto.getUnit())
      .content(requestDto.getContent())
      .build();

    lectureRepository.createLecture(lecture);

    return LectureResponseDto.builder()
      .id(lecture.getId())
      .lessonId(lecture.getLessonId())
      .unit(lecture.getUnit())
      .content(lecture.getContent())
      .build();
  }
}
