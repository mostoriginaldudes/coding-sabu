package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class LoginDto {
  private final String email;
  private final String password;
}
