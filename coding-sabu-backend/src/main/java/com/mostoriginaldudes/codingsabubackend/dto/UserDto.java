package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserDto {
  private int id;
  private String email;
  private String nickname;
  private String userType;
  private String phoneNum;
  private String description;
  private String profileImage;
}
