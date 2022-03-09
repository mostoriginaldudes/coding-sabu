package com.mostoriginaldudes.codingsabubackend.controller;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.SignupRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.SignupResponseDto;
import com.mostoriginaldudes.codingsabubackend.service.auth.AuthService;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.ACCESS_TOKEN;
import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.REFRESH_TOKEN;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  private final AuthService authService;
  private final UserService userService;


  @PostMapping("/login")
  public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto requestDto, HttpServletResponse response) {
    LoginResponseDto responseDto = authService.login(requestDto, response);

    if (responseDto == null) {
      return ResponseEntity
        .badRequest()
        .body(null);
    } else {
      UserDto user = userService.getUserInfo(responseDto.getId());
      String accessToken = authService.createAuthToken(ACCESS_TOKEN, user);

      String refreshToken = authService.createAuthToken(REFRESH_TOKEN, user);
      authService.setRefreshToken(response, refreshToken);

      return ResponseEntity
        .status(HttpStatus.OK)
        .header(HttpHeaders.AUTHORIZATION, accessToken)
        .body(responseDto);
    }
  }

  @GetMapping("/access")
  public ResponseEntity<?> accessToken(HttpServletRequest request, HttpServletResponse response) {
    try {
      return ResponseEntity
        .status(HttpStatus.OK)
        .header(HttpHeaders.AUTHORIZATION, authService.reissueAccessToken(request))
        .body(null);
    } catch (RuntimeException e) {
      authService.deleteRefreshToken(response);

      return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body(null);
    }
  }

  @GetMapping("/logout")
  public ResponseEntity<?> logout(HttpServletResponse response) {
    authService.deleteRefreshToken(response);

    return ResponseEntity.ok(null);
  }

  @GetMapping("/user/email/{email}")
  public ResponseEntity<String> checkEmail(@PathVariable String email) {
    String validatedEmail = authService.checkIfExistEmail(email);

    if (validatedEmail == null) {
      return ResponseEntity.ok(null);
    } else {
      return ResponseEntity
        .status(HttpStatus.CONFLICT)
        .body(validatedEmail);
    }
  }

  @PostMapping("/users")
  public ResponseEntity<SignupResponseDto> signup(@RequestBody SignupRequestDto requestDto) {
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(authService.signup(requestDto));
  }
}
