package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SignupRequestDto {
  private String email;
  private String password;
  private String nickname;
  private String userType;
  private String phoneNum;
  private String description;
}
