package com.mostoriginaldudes.codingsabubackend.service.auth;

import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;

public interface AuthService {
  LoginResponseDto login(LoginRequestDto loginRequest);
  String createAuthToken(String email);
}
