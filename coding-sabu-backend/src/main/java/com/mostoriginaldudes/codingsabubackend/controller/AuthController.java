package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequest) {

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .header("authToken", authService.createAuthToken(loginRequest.getEmail()))
        .body(authService.login(loginRequest));
  }
}
