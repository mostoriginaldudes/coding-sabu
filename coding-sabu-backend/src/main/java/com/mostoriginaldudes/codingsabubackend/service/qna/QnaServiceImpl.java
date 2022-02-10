package com.mostoriginaldudes.codingsabubackend.service.qna;

import com.mostoriginaldudes.codingsabubackend.dto.QuestionDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.QuestionRequestDto;
import com.mostoriginaldudes.codingsabubackend.respository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class QnaServiceImpl implements QnaService {

  private final QnaRepository qnaRepository;

  @Override
  @Transactional
  public QuestionDto addQuestion(QuestionRequestDto questionRequest) {
    QuestionDto question = QuestionDto.builder()
      .lessonId(questionRequest.getLessonId())
      .writerId(questionRequest.getWriterId())
      .title(questionRequest.getTitle())
      .article(questionRequest.getArticle())
      .build();

    qnaRepository.createQuestion(question);
    return question;
  }
}
