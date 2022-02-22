package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserRequestDto {
  private int id;
  private String email;
  private String nickname;
  private String userType;
  private String phoneNum;
  private String description;
  private String profileImage;
}
