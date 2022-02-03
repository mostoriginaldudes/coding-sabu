package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.*;

@Getter
public class SignupDto {
  @Setter
  private int id;
  private final String email;
  private final String password;
  private final String nickname;
  private final String userType;
  private final String phoneNum;
  private final String description;

  @Builder
  public SignupDto(String email, String password, String nickname, String userType, String phoneNum, String description) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.userType = userType;
    this.phoneNum = phoneNum;
    this.description = description;
  }
}
