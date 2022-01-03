package com.mostoriginaldudes.codingsabubackend.service.auth;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.SignupRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.SignupResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.AuthRepository;
import com.mostoriginaldudes.codingsabubackend.util.auth.JWT;
import com.mostoriginaldudes.codingsabubackend.util.auth.SHA256;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    UserDto user = getMatchedUser(loginRequest);

    if (user == null) {
      return null;
    } else {
      return new LoginResponseDto.Builder()
          .id(user.getId())
          .email(user.getEmail())
          .nickname(user.getNickname())
          .userType(user.getUserType())
          .phoneNum(user.getPhoneNum())
          .description(user.getDescription())
          .profileImage(user.getProfileImage())
          .builder();
    }
  }

  private UserDto getMatchedUser(LoginRequestDto loginRequest) {
    UserDto loginResponse = null;

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

  @Override
  public String checkIfExistEmail(String email) {
    return authRepository.checkIfExistEmail(email);
  }

  @Override
  @Transactional
  public SignupResponseDto signup(SignupRequestDto signupRequest) {
    authRepository.createUser(signupRequest);

    UserDto user = getMatchedUser(
        new LoginRequestDto(
            signupRequest.getEmail(),
            signupRequest.getPassword()
        )
    );

    return new SignupResponseDto.Builder()
        .id(user.getId())
        .email(user.getEmail())
        .nickname(user.getNickname())
        .userType(user.getUserType())
        .phoneNum(user.getPhoneNum())
        .description(user.getDescription())
        .profileImage(user.getProfileImage())
        .builder();
  }
}
