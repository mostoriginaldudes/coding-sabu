package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.RegisterLessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonListResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.lesson.LessonService;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lesson")
public class LessonController {

  private final LessonService lessonService;
  private final AuthService authService;
  private final UserService userService;

  @GetMapping("/all")
  public ResponseEntity<LessonListResponseDto> allLessons() {
    LessonListResponseDto responseDto = lessonService.getAllLessons();
    if(responseDto.getLessons().isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(responseDto);
    }
    return ResponseEntity.ok(responseDto);
  }

  @GetMapping("/{lessonId}")
  public ResponseEntity<LessonResponseDto> lesson(@PathVariable int lessonId) {
    LessonResponseDto responseDto = lessonService.getLesson(lessonId);

    if(responseDto == null) {
      return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(null);
    }
    return ResponseEntity.ok(responseDto);
  }

  @PostMapping
  public ResponseEntity<LessonResponseDto> createLesson(@ModelAttribute LessonRequestDto requestDto) {
    UserDto user = userService.getUserInfo(requestDto.getTeacherId());
    if ("student".equals(user.getUserType())) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(lessonService.createLesson(requestDto));
  }

  @PostMapping("/{lessonId}/student")
  public ResponseEntity<LessonResponseDto> registerLesson(
    @PathVariable int lessonId,
    @RequestBody RegisterLessonRequestDto requestDto
  ) {
    LessonResponseDto responseDto = lessonService.registerLesson(lessonId, requestDto.getStudentId());

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(responseDto);
  }

  @GetMapping("/{lessonId}/students")
  public ResponseEntity<List<UserDto>> studentsInMyLesson(
    @PathVariable int lessonId,
    @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization
  ) {
    UserDto user = authService.getLoggedInUserInfo(authorization);

    if(user == null || user.getUserType().equals("student")) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }

    List<UserDto> students = lessonService.getStudentsInMyClass(lessonId, user.getId());
    if(students.isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(students);
    }
    return ResponseEntity.ok(students);
  }

  @GetMapping("/me")
  public ResponseEntity<LessonListResponseDto> mylessons(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
    UserDto user = authService.getLoggedInUserInfo(accessToken);
    return ResponseEntity.ok(lessonService.getMyLessons(user.getId()));
  }

  @GetMapping("/teachings")
  public ResponseEntity<LessonListResponseDto> myTeachingLessons(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
    UserDto user = authService.getLoggedInUserInfo(accessToken);
    return ResponseEntity.ok(lessonService.getTeachingLesson(user.getId()));
  }
}
