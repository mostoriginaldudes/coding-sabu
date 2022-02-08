package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.RegisterLessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonListResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.lesson.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.AUTHORIZATION_HEADER;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lesson")
public class LessonController {

  private final LessonService lessonService;
  private final AuthService authService;

  @GetMapping("/all")
  public ResponseEntity<LessonListResponseDto> allLessons(@RequestParam(required = false, defaultValue = "0") int page) {
    LessonListResponseDto responseDto = lessonService.getAllLessons(page);
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
  public ResponseEntity<LessonResponseDto> createLesson(
    @RequestHeader Map<String, Object> requestHeader,
    @ModelAttribute LessonRequestDto requestDto
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

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(lessonService.createLesson(requestDto, user.getId()));
  }

  @PostMapping("/{lessonId}/student")
  public ResponseEntity<LessonResponseDto> registerLesson(
    @PathVariable int lessonId,
    @RequestHeader Map<String, Object> requestHeader,
    @RequestBody RegisterLessonRequestDto requestDto
  ) {
    if (!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    LessonResponseDto responseDto = lessonService.registerLesson(lessonId, requestDto.getStudentId());

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(responseDto);
  }

  @GetMapping("/{lessonId}/students")
  public ResponseEntity<List<UserDto>> studentsInMyLesson(
    @RequestHeader Map<String, Object> requestHeader,
    @PathVariable int lessonId
  ) {
    if (!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

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
}
