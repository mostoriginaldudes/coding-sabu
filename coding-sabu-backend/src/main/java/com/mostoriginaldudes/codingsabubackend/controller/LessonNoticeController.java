package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonNoticeRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeListResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.lessonnotice.LessonNoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/lesson/{lessonId}/notice")
public class LessonNoticeController {

  private final AuthService authService;
  private final LessonNoticeService lessonNoticeService;

  @GetMapping
  public ResponseEntity<LessonNoticeListResponseDto> lessonNotice(@PathVariable int lessonId) {
    LessonNoticeListResponseDto responseDto = lessonNoticeService.getLessonNotices(lessonId);

    if(responseDto.getLessonNotices().isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(null);
    }

    return ResponseEntity.ok(responseDto);
  }

  @PostMapping
  public ResponseEntity<LessonNoticeResponseDto> registerLessonNotice(
    @PathVariable int lessonId,
    @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken,
    @RequestBody LessonNoticeRequestDto requestDto
    ) {
    UserDto user = authService.getLoggedInUserInfo(accessToken);

    if(user == null || !lessonNoticeService.isMyLesson(user.getId(), lessonId)) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(lessonNoticeService.createLessonNotice(lessonId, requestDto));
  }
}
