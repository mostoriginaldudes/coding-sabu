package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
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

    @GetMapping("/lessons?page={page}")
    public ResponseEntity<List<LessonDto>> allLessons(@RequestParam(defaultValue = "0") int page) {
        return ResponseEntity.ok(lessonService.getAllLessons(page));
    }

    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<LessonDto> lesson(@PathVariable int lessonId) {
        // lessonId 명시하지 않은 경우 BAD REQUEST
        if(lessonId == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } else {
            return ResponseEntity.ok(lessonService.getLessonById(lessonId));
        }
    }

    @PostMapping("/lessons")
    public ResponseEntity<LessonDto> createLesson (
        @RequestHeader Map<String, Object> requestHeader,
        @RequestBody LessonDto lesson
    ) {
        if(!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(null);
        }

        String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
        UserDto user = authService.getLoggedInUserInfo(token);

        if(user.getUserType().equals("student")) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(null);
        }

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(lessonService.createLesson(lesson));
    }
}
