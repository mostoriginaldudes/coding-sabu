package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EditUserInfoRequestDto {
  private int id;
  private String email;
  private String password;
  private String nickname;
  private String phoneNum;
  private String description;
}
