package com.mostoriginaldudes.codingsabubackend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ExceptionCode {

  NO_EXIST_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "로그인이 되어있지 않습니다."),
  NO_EXIST_ACCESS_TOKEN(HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");

  private final HttpStatus httpStatus;
  private final String exceptionMessage;
}
