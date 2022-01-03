package com.mostoriginaldudes.codingsabubackend.service.user;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;

public interface UserService {
  EditUserInfoResponseDto editUserInfo(EditUserInfoRequestDto editUserInfoRequest);
  UserDto getUserInfo(int id);
  String uploadProfileImage();
}
