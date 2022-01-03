package com.mostoriginaldudes.codingsabubackend.service.auth;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;

public interface AuthService {
  UserDto login(LoginRequestDto loginRequest);
  String createAuthToken(String email);
}
