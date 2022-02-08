package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
  private int id;
  private String email;
  private String nickname;
  private String userType;
  private String phoneNum;
  private String description;
  private String profileImage;
}
