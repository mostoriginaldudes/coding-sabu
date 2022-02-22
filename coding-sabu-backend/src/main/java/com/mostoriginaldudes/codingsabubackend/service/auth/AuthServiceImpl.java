package com.mostoriginaldudes.codingsabubackend.service.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mostoriginaldudes.codingsabubackend.auth.JsonWebToken;
import com.mostoriginaldudes.codingsabubackend.auth.Security;
import com.mostoriginaldudes.codingsabubackend.dto.LoginDto;
import com.mostoriginaldudes.codingsabubackend.dto.SignupDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.SignupRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.SignupResponseDto;
import com.mostoriginaldudes.codingsabubackend.exception.ExceptionCode;
import com.mostoriginaldudes.codingsabubackend.exception.UnauthorizationException;
import com.mostoriginaldudes.codingsabubackend.respository.AuthRepository;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import com.mostoriginaldudes.codingsabubackend.util.cookie.CookieParser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.*;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

  private final AuthRepository authRepository;
  private final JsonWebToken jwt;
  private final CookieParser cookieParser;
  private final UserService userService;

  @Override
  public LoginResponseDto login(LoginRequestDto loginRequest, HttpServletResponse response) {
    String encryptedPassword = Security.encrypt(loginRequest.getPassword());

    UserDto user = getMatchedUser(
      LoginDto.builder()
        .email(loginRequest.getEmail())
        .password(encryptedPassword)
        .build()
    );

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
  public SignupResponseDto signup(SignupRequestDto requestDto) {
    String encryptedPassword = Security.encrypt(requestDto.getPassword());
    authRepository.createUser(SignupDto.builder()
      .email(requestDto.getEmail())
      .password(encryptedPassword)
      .userType(requestDto.getUserType())
      .nickname(requestDto.getNickname())
      .phoneNum(requestDto.getPhoneNum())
      .description(requestDto.getDescription())
      .build()
    );

    UserDto user = getMatchedUser(
      LoginDto.builder()
        .email(requestDto.getEmail())
        .password(encryptedPassword)
        .build()
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

  private UserDto getMatchedUser(LoginDto login) {
    return authRepository.matchUser(login);
  }

  @Override
  public String reissueAccessToken(HttpServletRequest request) throws RuntimeException{
    Optional<String> optRefreshToken = cookieParser.parseCookie(REFRESH_TOKEN, request.getCookies());

    String unverifiedRefreshToken = optRefreshToken.orElseThrow(
      () -> new UnauthorizationException(ExceptionCode.NO_EXIST_REFRESH_TOKEN)
    );

    Claims claims = jwt.verifyJsonWebToken(unverifiedRefreshToken);
    String refreshToken = (String) claims.get(REFRESH_TOKEN);
    Integer userId = (Integer) claims.get("userId");

    if (REFRESH_TOKEN_UUID.equals(refreshToken)) {
      return createAuthToken(ACCESS_TOKEN, userService.getUserInfo(userId));
    } else {
      throw new MalformedJwtException("올바르지 않은 토큰입니다.");
    }
  }

  @Override
  public String createAuthToken(String claimKey, UserDto user) {
    return jwt.issueJsonWebToken(claimKey, user);
  }

  @Override
  public String checkIfExistEmail(String email) {
    return authRepository.checkIfExistEmail(email);
  }

  @Override
  public UserDto getLoggedInUserInfo(String token) {
    try {
      Claims claims = jwt.verifyJsonWebToken(token);
      return new ObjectMapper().convertValue(claims.get("userInfo"), UserDto.class);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public void setRefreshToken(HttpServletResponse response, String refreshToken) {
    Cookie cookie = new Cookie(REFRESH_TOKEN, refreshToken);
    cookie.setMaxAge(7 * 24 * 60 * 60);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    response.addCookie(cookie);
  }

  @Override
  public void deleteRefreshToken(HttpServletResponse response) {
    Cookie cookie = new Cookie(REFRESH_TOKEN, null);
    cookie.setMaxAge(0);
    cookie.setPath("/");
    response.addCookie(cookie);
  }
}
