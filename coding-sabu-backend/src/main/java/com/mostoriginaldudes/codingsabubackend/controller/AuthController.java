package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.SignupRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.SignupResponseDto;
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
    LoginResponseDto loginResponse = authService.login(loginRequest);
    String authToken = authService.createAuthToken(loginRequest.getEmail());

    if(loginResponse == null) {
      return ResponseEntity
          .badRequest()
          .body(null);
    } else {
      return ResponseEntity
          .status(HttpStatus.CREATED)
          .header("Authorization", authToken)
          .body(loginResponse);
    }
  }

  @GetMapping("/user/email/{email}")
  public ResponseEntity<String> checkEmail(@PathVariable String email) {
    String validatedEmail = authService.checkIfExistEmail(email);

    if(validatedEmail == null) {
      return ResponseEntity.ok(null);
    } else {
      return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(validatedEmail);
    }
  }

  @PostMapping("/users")
  public ResponseEntity<SignupResponseDto> signup(@RequestBody SignupRequestDto signupRequest) {
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(authService.signup(signupRequest));
  }
}