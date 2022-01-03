package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequest) {
    UserDto user = authService.login(loginRequest);
    String authToken = authService.createAuthToken(loginRequest.getEmail());

    if(user == null) {
      return ResponseEntity.badRequest().body(null);
    } else {
      LoginResponseDto loginResponse = new LoginResponseDto.Builder()
          .id(user.getId())
          .email(user.getEmail())
          .nickname(user.getNickname())
          .userType(user.getUserType())
          .profileImage(user.getProfileImage())
          .builder();

      return ResponseEntity
          .status(HttpStatus.CREATED)
          .header("Authorization", authToken)
          .body(loginResponse);
    }

  }

  @GetMapping("/user/email/{email}")
  public ResponseEntity<String> checkEmail(@PathVariable String email) throws NullPointerException {
    String validatedEmail = authService.checkIfExistEmail(email);

    if(validatedEmail == null) {
      return ResponseEntity.ok(null);
    } else {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(validatedEmail);
    }
  }
}
