package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.service.lesson.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LessonController {
    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/lessons?page={page}")
    public ResponseEntity<List<LessonDto>> allLessons(@RequestParam(defaultValue = "0") int page) {
        return ResponseEntity.ok(lessonService.getAllLessons(page));
    }

    @GetMapping("lesson/{lessonId}")
    public ResponseEntity<LessonDto> lesson(@PathVariable int lessonId) {
        // lessonId 명시하지 않은 경우 BAD REQUEST
        if(lessonId == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } else {
            return ResponseEntity.ok(lessonService.getLessonById(lessonId));
        }
    }
}
