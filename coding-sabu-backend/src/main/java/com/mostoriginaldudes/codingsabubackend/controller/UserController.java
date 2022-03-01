package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonListResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.lesson.LessonService;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

  private final UserService userService;
  private final AuthService authService;
  private final LessonService lessonService;

  @GetMapping
  public ResponseEntity<UserDto> myInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
    UserDto user = authService.getLoggedInUserInfo(accessToken);
    return ResponseEntity.ok(user);
  }

  @PutMapping
  public ResponseEntity<EditUserInfoResponseDto> editMyInfo(
    @ModelAttribute EditUserInfoRequestDto requestDto,
    @RequestParam(required = false) MultipartFile profileImage
  ) {
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(userService.editUserInfo(requestDto, profileImage));
  }

  @PatchMapping("/profile")
  public ResponseEntity<String> uploadProfileImage (
      @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken,
      @RequestParam MultipartFile userProfile
  ) {
    UserDto user = authService.getLoggedInUserInfo(accessToken);

    String profileImageUrl = userService.uploadProfileImage(userProfile);
    userService.updateProfileImagePath(user.getId(), profileImageUrl);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(profileImageUrl);
  }

  @GetMapping("/@{nickname}")
  public ResponseEntity<UserDto> searchTeacher(
    @PathVariable String nickname,
    @RequestParam(defaultValue = "teacher") String userType
  ) {
    if(!"teacher".equals(userType)) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }
    UserDto teacher = userService.getTeacherInfo(nickname);

    if(teacher == null) {
      return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(null);
    } else {
      return ResponseEntity.ok(teacher);
    }
  }

  @GetMapping("/{userId}/lessons")
  public ResponseEntity<LessonListResponseDto> myLessons (@PathVariable int userId) {
    LessonListResponseDto responseDto = lessonService.getMyLessons(userId);

    if(responseDto.getLessons().isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(responseDto);
    }

    return ResponseEntity.ok(responseDto);
  }

  @GetMapping("/{teacherId}/teaching")
  public ResponseEntity<LessonListResponseDto> lessonsBelongToTeacher(@PathVariable int teacherId) {
    return ResponseEntity.ok(lessonService.getTeachingLesson(teacherId));
  }
}
