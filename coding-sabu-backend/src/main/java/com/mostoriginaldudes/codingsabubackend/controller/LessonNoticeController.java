package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.LessonNoticeDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonNoticeRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonNoticeListResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.lessonnotice.LessonNoticeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.AUTHORIZATION_HEADER;

@RestController
@RequestMapping("/lesson/{lessonId}/notice")
public class LessonNoticeController {
  private final AuthService authService;
  private final LessonNoticeService lessonNoticeService;

  public LessonNoticeController(LessonNoticeService lessonNoticeService, AuthService authService) {
    this.authService = authService;
    this.lessonNoticeService = lessonNoticeService;
  }

  @GetMapping
  public ResponseEntity<LessonNoticeListResponseDto> lessonNotice(@PathVariable int lessonId) {
    List<LessonNoticeDto> lessonNotices = lessonNoticeService.getLessonNotices(lessonId);

    if(lessonNotices.isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(null);
    }

    return ResponseEntity.ok(new LessonNoticeListResponseDto(lessonNotices));
  }

  @PostMapping
  public ResponseEntity<LessonNoticeResponseDto> registerLessonNotice(
    @PathVariable int lessonId,
    @RequestHeader Map<String, Object> requestHeader,
    @RequestBody LessonNoticeRequestDto requestDto
    ) {
    if(!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

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
