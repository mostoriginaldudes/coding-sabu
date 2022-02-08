package com.mostoriginaldudes.codingsabubackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class EditUserInfoDto {
  private int id;
  private String password;
  private String nickname;
  private String phoneNum;
  private String description;
  private String profileImage;
}
