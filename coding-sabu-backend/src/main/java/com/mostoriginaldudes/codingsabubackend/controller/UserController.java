package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonListResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.lesson.LessonService;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.AUTHORIZATION_HEADER;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

  private final UserService userService;
  private final AuthService authService;
  private final LessonService lessonService;

  @GetMapping
  public ResponseEntity<UserDto> myInfo(@RequestHeader Map<String, Object> requestHeader) {
    if(!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

    return ResponseEntity.ok(user);
  }

  @PutMapping
  public ResponseEntity<EditUserInfoResponseDto> editMyInfo (
      @RequestHeader Map<String, Object> requestHeader,
      @RequestBody EditUserInfoRequestDto requestDto
    ) {
    if(!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

    if(user == null || user.getId() != requestDto.getId()) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(userService.editUserInfo(requestDto));
  }

  @PatchMapping("/profile")
  public ResponseEntity<String> uploadProfileImage (
      @RequestHeader Map<String, Object> requestHeader,
      @RequestParam MultipartFile userProfile
  ) {
    if(!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    String token = (String) requestHeader.get(AUTHORIZATION_HEADER);
    UserDto user = authService.getLoggedInUserInfo(token);

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
  public ResponseEntity<LessonListResponseDto> myLessons (
    @PathVariable int userId,
    @RequestHeader Map<String, Object> requestHeader
  ) {
    if (!requestHeader.containsKey(AUTHORIZATION_HEADER)) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(null);
    }

    LessonListResponseDto responseDto = lessonService.getMyLessons(userId);

    if(responseDto.getLessons().isEmpty()) {
      return ResponseEntity
        .status(HttpStatus.NO_CONTENT)
        .body(responseDto);
    }

    return ResponseEntity.ok(responseDto);
  }
}
