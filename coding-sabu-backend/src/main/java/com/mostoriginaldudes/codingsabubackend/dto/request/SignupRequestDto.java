package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupRequestDto {
  private int id;
  private String email;
  private String password;
  private String nickname;
  private String userType;
  private String phoneNum;
  private String description;
}
