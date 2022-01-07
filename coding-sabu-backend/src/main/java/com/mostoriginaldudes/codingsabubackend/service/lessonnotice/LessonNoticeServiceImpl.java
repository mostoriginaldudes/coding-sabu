package com.mostoriginaldudes.codingsabubackend.service.lessonnotice;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.LessonNoticeDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonNoticeRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.LessonNoticeRepository;
import com.mostoriginaldudes.codingsabubackend.respository.LessonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LessonNoticeServiceImpl implements LessonNoticeService {
  private final LessonNoticeRepository lessonNoticeRepository;
  private final LessonRepository lessonRepository;

  public LessonNoticeServiceImpl(LessonNoticeRepository lessonNoticeRepository, LessonRepository lessonRepository) {
    this.lessonNoticeRepository = lessonNoticeRepository;
    this.lessonRepository = lessonRepository;
  }

  @Override
  public List<LessonNoticeDto> getLessonNotices(int lessonId) {
    return lessonNoticeRepository.getLessonNoticeByLessonId(lessonId);
  }

  @Override
  @Transactional
  public LessonNoticeResponseDto createLessonNotice(int lessonId, LessonNoticeRequestDto lessonNoticeRequestDto) {
    lessonNoticeRequestDto.setLessonId(lessonId);
    lessonNoticeRepository.createLessonNotice(lessonNoticeRequestDto);

    return new LessonNoticeResponseDto.Builder()
      .id(lessonNoticeRequestDto.getId())
      .lessonId(lessonNoticeRequestDto.getLessonId())
      .lessonNoticeArticle(lessonNoticeRequestDto.getLessonNoticeArticle())
      .builder();
  }

  @Override
  public boolean isMyLesson(int userId, int lessonId) {
    LessonDto lesson = lessonRepository.getLessonById(lessonId);
    return lesson.getTeacherId() == userId;
  }
}
