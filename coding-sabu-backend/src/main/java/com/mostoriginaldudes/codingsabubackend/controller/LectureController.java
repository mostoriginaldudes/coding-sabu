package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.request.LectureRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LectureResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LectureUnitListResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.lecture.LectureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lesson")
public class LectureController {

  private final LectureService lectureService;

  @GetMapping("/{lessonId}/lecture")
  public ResponseEntity<LectureUnitListResponseDto> getLecture(@PathVariable int lessonId) {
    return ResponseEntity.ok(lectureService.getLectureUnits(lessonId));
  }

  @PostMapping("/{lessonId}/lecture")
  public ResponseEntity<LectureResponseDto> createLecture(
    @PathVariable int lessonId,
    @RequestBody LectureRequestDto requestDto
  ) {
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(lectureService.createLecture(lessonId, requestDto));
  }
}
