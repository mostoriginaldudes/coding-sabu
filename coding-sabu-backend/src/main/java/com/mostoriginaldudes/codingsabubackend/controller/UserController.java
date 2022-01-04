package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.AUTHORIZATION_HEADER;

@RestController
@RequestMapping("/user")
public class UserController {
  private final UserService userService;
  private final AuthService authService;

  public UserController(UserService userService, AuthService authService) {
    this.userService = userService;
    this.authService = authService;
  }

  @PutMapping("/me")
  public ResponseEntity<EditUserInfoResponseDto> editMyInfo(
      EditUserInfoRequestDto editInfoRequest,
      @RequestHeader Map<String, Object> requestHeader
    ) {

    if(!requestHeader.containsKey(HttpHeaders.AUTHORIZATION)) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(userService.editUserInfo(editInfoRequest));
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
}
