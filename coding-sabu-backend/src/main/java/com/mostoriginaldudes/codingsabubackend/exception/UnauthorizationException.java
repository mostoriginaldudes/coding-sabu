package com.mostoriginaldudes.codingsabubackend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

// 접근 권한(Access Token)이 없는 경우에 발생시킴.
@Getter
@RequiredArgsConstructor
public class UnauthorizationException extends RuntimeException {
  private final ExceptionCode exceptionCode;
}
