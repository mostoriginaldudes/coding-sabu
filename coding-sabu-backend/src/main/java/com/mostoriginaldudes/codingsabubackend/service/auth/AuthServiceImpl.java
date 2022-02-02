package com.mostoriginaldudes.codingsabubackend.service.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.SignupRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.SignupResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.AuthRepository;
import com.mostoriginaldudes.codingsabubackend.util.auth.JWT;
import com.mostoriginaldudes.codingsabubackend.util.auth.Security;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
  private final AuthRepository authRepository;
  private final JWT jwt;

  @Override
  public LoginResponseDto login(LoginRequestDto loginRequest) {
    String encryptedPassword = Security.encrypt(loginRequest.getPassword());
    loginRequest.setPassword(encryptedPassword);

    UserDto user = getMatchedUser(loginRequest);

    if (user == null) {
      return null;
    } else {
      return LoginResponseDto.builder()
        .id(user.getId())
        .email(user.getEmail())
        .nickname(user.getNickname())
        .userType(user.getUserType())
        .phoneNum(user.getPhoneNum())
        .description(user.getDescription())
        .profileImage(user.getProfileImage())
        .build();
    }
  }

  @Override
  @Transactional
  public SignupResponseDto signup(SignupRequestDto signupRequest) {
    String encryptedPassword = Security.encrypt(signupRequest.getPassword());
    signupRequest.setPassword(encryptedPassword);

    authRepository.createUser(signupRequest);

    UserDto user = getMatchedUser(
      new LoginRequestDto(
        signupRequest.getEmail(),
        encryptedPassword
      )
    );

    return SignupResponseDto.builder()
      .id(user.getId())
      .email(user.getEmail())
      .nickname(user.getNickname())
      .userType(user.getUserType())
      .phoneNum(user.getPhoneNum())
      .description(user.getDescription())
      .profileImage(user.getProfileImage())
      .build();
  }

  private UserDto getMatchedUser(LoginRequestDto loginRequest) {
    return authRepository.matchUser(
        new LoginRequestDto(
          loginRequest.getEmail(),
          loginRequest.getPassword()
        )
    );
  }

  @Override
  public String createAuthToken(LoginResponseDto loginResponseDto) {
    return jwt.issueJsonWebToken(loginResponseDto);
  }

  @Override
  public String checkIfExistEmail(String email) {
    return authRepository.checkIfExistEmail(email);
  }

  @Override
  public UserDto getLoggedInUserInfo(String token)  {
    try {
      Claims claims = jwt.verifyJsonWebToken(token);
      return new ObjectMapper().convertValue(claims.get("userInfo"), UserDto.class);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
