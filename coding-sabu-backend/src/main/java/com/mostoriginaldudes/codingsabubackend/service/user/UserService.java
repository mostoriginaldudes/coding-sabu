package com.mostoriginaldudes.codingsabubackend.service.user;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
  EditUserInfoResponseDto editUserInfo(EditUserInfoRequestDto editUserInfoRequest);
  UserDto getUserInfo(int id);
  String uploadProfileImage(MultipartFile profileImage);
  String updateProfileImagePath(int id, String profileImagePath);
}
