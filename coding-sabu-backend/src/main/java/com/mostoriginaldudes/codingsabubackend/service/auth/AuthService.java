package com.mostoriginaldudes.codingsabubackend.service.auth;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.SignupRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.SignupResponseDto;

public interface AuthService {
  LoginResponseDto login(LoginRequestDto loginRequest);
  String createAuthToken(LoginResponseDto loginResponse);
  String checkIfExistEmail(String email);
  SignupResponseDto signup(SignupRequestDto signupRequest);
  UserDto getLoggedInUserInfo(String token);
}
