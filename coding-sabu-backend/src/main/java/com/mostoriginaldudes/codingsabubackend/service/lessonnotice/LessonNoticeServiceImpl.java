package com.mostoriginaldudes.codingsabubackend.service.lessonnotice;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.LessonNoticeDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonNoticeRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeListResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.LessonNoticeRepository;
import com.mostoriginaldudes.codingsabubackend.respository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonNoticeServiceImpl implements LessonNoticeService {

  private final LessonNoticeRepository lessonNoticeRepository;
  private final LessonRepository lessonRepository;

  @Override
  public LessonNoticeListResponseDto getLessonNotices(int lessonId) {
    List<LessonNoticeDto> lessonNotice = lessonNoticeRepository.getLessonNoticeByLessonId(lessonId);
    return new LessonNoticeListResponseDto(lessonNotice);
  }

  @Override
  @Transactional
  public LessonNoticeResponseDto createLessonNotice(int lessonId, LessonNoticeRequestDto requestDto) {

    LessonNoticeDto lessonNotice = LessonNoticeDto.builder()
        .lessonId(lessonId)
        .lessonNoticeArticle(requestDto.getLessonNoticeArticle())
        .build();

    lessonNoticeRepository.createLessonNotice(lessonNotice);

    return LessonNoticeResponseDto.builder()
      .id(lessonNotice.getId())
      .lessonId(lessonNotice.getLessonId())
      .lessonNoticeArticle(lessonNotice.getLessonNoticeArticle())
      .build();
  }

  @Override
  public boolean isMyLesson(int userId, int lessonId) {
    LessonDto lesson = lessonRepository.getLessonById(lessonId);
    return lesson.getTeacherId() == userId;
  }
}
