package com.mostoriginaldudes.codingsabubackend.exception;

import lombok.RequiredArgsConstructor;

// 인증되지 않은(Refresh Token이 없는) 사용자임을 나타냄
@RequiredArgsConstructor
public class UnauthenticatedException extends RuntimeException {
  private final ExceptionCode exceptionCode;
}
