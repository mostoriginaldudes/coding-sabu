package com.mostoriginaldudes.codingsabubackend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UnauthenticatedException extends RuntimeException {
  private final ExceptionCode exceptionCode;
}
