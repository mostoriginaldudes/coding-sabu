package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequestDto {
  private String email;
  private String password;
  private String nickname;
  private String userType;
  private String phoneNum;
  private String description;
}
