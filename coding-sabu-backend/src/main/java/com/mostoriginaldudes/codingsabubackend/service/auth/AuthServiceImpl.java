package com.mostoriginaldudes.codingsabubackend.service.auth;

import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.AuthRepository;
import com.mostoriginaldudes.codingsabubackend.util.auth.JWT;
import com.mostoriginaldudes.codingsabubackend.util.auth.SHA256;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
  private final AuthRepository authRepository;
  private final JWT jwt;

  public AuthServiceImpl(AuthRepository authRepository, JWT jwt) {
    this.authRepository = authRepository;
    this.jwt = jwt;
  }

  @Override
  public LoginResponseDto login(LoginRequestDto loginRequest) {
    return getMatchedUser(loginRequest);
  }

  private LoginResponseDto getMatchedUser(LoginRequestDto loginRequest) {
    LoginResponseDto loginResponse = null;

    try {
      String password = loginRequest.getPassword();
      String encryptedPassword = SHA256.encrypt(password);
      loginRequest.setPassword(encryptedPassword);

      loginResponse = authRepository.matchUser(loginRequest);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return loginResponse;
  }

  @Override
  public String createAuthToken(String email) {
    return jwt.issueJsonWebToken(email);
  }
}
