package com.mostoriginaldudes.codingsabubackend.service.auth;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.SignupRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.SignupResponseDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthService {
  LoginResponseDto login(LoginRequestDto loginRequest, HttpServletResponse response);
  String createAuthToken(String claimKey, UserDto user);
  String reissueAccessToken(HttpServletRequest request);
  String checkIfExistEmail(String email);
  SignupResponseDto signup(SignupRequestDto signupRequest);
  UserDto getLoggedInUserInfo(String token);
  void setRefreshToken(HttpServletResponse response, String refreshToken);
  void deleteRefreshToken(HttpServletResponse response);
}
