package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.lesson.LessonService;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.AUTHORIZATION_HEADER;

@RestController
@RequestMapping("/user")
public class UserController {
  private final UserService userService;
  private final AuthService authService;
  private final LessonService lessonService;

  public UserController(
    UserService userService,
    AuthService authService,
    LessonService lessonService
  ) {
    this.userService = userService;
    this.authService = authService;
    this.lessonService = lessonService;
  }

  @PutMapping
  public ResponseEntity<EditUserInfoResponseDto> editMyInfo (
      @RequestHeader Map<String, Object> requestHeader,
      @RequestBody EditUserInfoRequestDto editUserInfoRequest
    ) {
    if(!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

    if(user == null || user.getId() != editUserInfoRequest.getId()) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(userService.editUserInfo(editUserInfoRequest));
  }

  @PatchMapping("/profile")
  public ResponseEntity<String> uploadProfileImage (
      @RequestParam MultipartFile multipartFile,
      @RequestHeader Map<String, Object> requestHeader
  ) {
    if(!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

    String profileImageUrl = userService.uploadProfileImage(multipartFile);
    userService.updateProfileImagePath(user.getId(), profileImageUrl);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(profileImageUrl);
  }

  @GetMapping("/@{nickname}?userType={userType}")
  public ResponseEntity<UserDto> searchTeacher(
    @PathVariable String nickname,
    @RequestParam(defaultValue = "teacher") String userType
  ) {
    if(!userType.equals("teacher")) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }
    UserDto teacher = userService.getTeacherInfo(nickname);

    if(teacher == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } else {
      return ResponseEntity.ok(teacher);
    }
  }

  @GetMapping("/{userId}/lessons")
  public ResponseEntity<List<LessonDto>> myLessons (
    @RequestHeader Map<String, Object> requestHeader,
    @PathVariable int userId
  ) {
    if (!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    List<LessonDto> lessons = lessonService.getMyLessons(userId);

    if(lessons.isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(lessons);
    }

    return ResponseEntity.ok(lessons);
  }
}
