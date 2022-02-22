package com.mostoriginaldudes.codingsabubackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class LoginRequestDto {
  private String email;
  private String password;
}
