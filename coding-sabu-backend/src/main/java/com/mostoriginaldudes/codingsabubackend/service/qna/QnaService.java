package com.mostoriginaldudes.codingsabubackend.service.qna;

import com.mostoriginaldudes.codingsabubackend.dto.QuestionDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.QuestionRequestDto;

public interface QnaService {
  QuestionDto addQuestion(QuestionRequestDto questionRequest);
}
