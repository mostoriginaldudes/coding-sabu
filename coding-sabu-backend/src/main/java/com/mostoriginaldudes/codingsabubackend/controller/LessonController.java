package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.RegisterLessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.lesson.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.AUTHORIZATION_HEADER;

@RestController
public class LessonController {
  private final LessonService lessonService;
  private final AuthService authService;

  public LessonController(LessonService lessonService, AuthService authService) {
    this.lessonService = lessonService;
    this.authService = authService;
  }

  @GetMapping("/lessons")
  public ResponseEntity<List<LessonDto>> allLessons(@RequestParam(required = false, defaultValue = "0") int page) {
    List<LessonDto> lessons = lessonService.getAllLessons(page);
    if(lessons.isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(lessons);
    }
    return ResponseEntity.ok(lessons);
  }

  @GetMapping("/lesson/{lessonId}")
  public ResponseEntity<LessonDto> lesson(@PathVariable int lessonId) {
    LessonDto lesson = lessonService.getLesson(lessonId);
    if (lesson == null) {
      return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(null);
    }
    return ResponseEntity.ok(lesson);
  }

  @PostMapping("/lessons")
  public ResponseEntity<LessonDto> createLesson(
    @RequestHeader Map<String, Object> requestHeader,
    @RequestBody LessonDto lesson
  ) {
    if (!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

    if (user.getUserType().equals("student")) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(lessonService.createLesson(lesson));
  }

  @PostMapping("/lesson/{lessonId}/student")
  public ResponseEntity<LessonDto> registerLesson(
    @PathVariable int lessonId,
    @RequestHeader Map<String, Object> requestHeader,
    @RequestBody RegisterLessonRequestDto registerLessonRequest
  ) {
    if (!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    LessonDto lesson = lessonService.registerLesson(lessonId, registerLessonRequest.getStudentId());
    if (lesson == null) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(lesson);
  }

  @GetMapping("/lessons/me")
  public ResponseEntity<List<LessonDto>> myLessons (
    @RequestHeader Map<String, Object> requestHeader
  ) {
    if (!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

    List<LessonDto> lessons = lessonService.getMyLessons(user.getId());

    if(lessons.isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(lessons);
    }

    return ResponseEntity.ok(lessons);
  }
}
