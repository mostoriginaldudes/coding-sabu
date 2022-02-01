package com.mostoriginaldudes.codingsabubackend.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class LoginResponseDto {
  private final int id;
  private final String email;
  private final String nickname;
  private final String userType;
  private final String phoneNum;
  private final String description;
  private final String profileImage;
}
