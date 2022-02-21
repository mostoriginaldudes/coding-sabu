package com.mostoriginaldudes.codingsabubackend.interceptor;

import com.mostoriginaldudes.codingsabubackend.auth.JsonWebToken;
import com.mostoriginaldudes.codingsabubackend.exception.ExceptionCode;
import com.mostoriginaldudes.codingsabubackend.exception.UnauthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.AUTHORIZATION_HEADER;

@RequiredArgsConstructor
@Component
public class AuthInterceptor implements HandlerInterceptor {

  private final JsonWebToken jwt;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    if(HttpMethod.OPTIONS.matches(request.getMethod())) {
      return true;
    }

    try {
      String accessToken = request.getHeader(AUTHORIZATION_HEADER);
      return verifyAccessToken(accessToken);
    } catch(Exception e) {
      e.printStackTrace();
      return false;
    }
  }

  private boolean verifyAccessToken(String givenAccessToken) {
    Optional<String> optAccessToken = Optional.ofNullable(givenAccessToken);

    try {
      String accessToken = optAccessToken.orElseThrow(
        () -> new UnauthorizationException(ExceptionCode.NO_EXIST_ACCESS_TOKEN)
      );

      jwt.verifyJsonWebToken(accessToken);

      return true;
    } catch(Exception e) {
      e.printStackTrace();
      return false;
    }
  }
}