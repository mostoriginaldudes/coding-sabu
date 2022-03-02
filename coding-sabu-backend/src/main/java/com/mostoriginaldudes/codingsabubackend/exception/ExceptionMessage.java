package com.mostoriginaldudes.codingsabubackend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ExceptionMessage {
  FAIL_FILE_UPLOAD("파일 업로드 과정에서 문제가 발생했습니다.");

  private final String exceptionMessage;
}
