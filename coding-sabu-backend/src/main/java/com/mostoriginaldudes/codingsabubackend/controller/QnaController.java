package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.QuestionDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.QuestionRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.QuestionResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.qna.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.AUTHORIZATION_HEADER;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lesson")
public class QnaController {

  private final AuthService authService;
  private final QnaService qnaService;

  @PostMapping("/{lessonId}/question")
  public ResponseEntity<QuestionDto> addQuestion(
    @PathVariable int lessonId,
    @RequestHeader Map<String, Object> requestHeader,
    @RequestBody QuestionRequestDto requestDto
  ) {
    if (!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

    if ("student".equals(user.getUserType())) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }

    requestDto.setLessonId(lessonId);
    requestDto.setWriterId(user.getId());

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(qnaService.addQuestion(requestDto));
  }
}
