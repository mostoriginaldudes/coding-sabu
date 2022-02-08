package com.mostoriginaldudes.codingsabubackend.service.user;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
  EditUserInfoResponseDto editUserInfo(EditUserInfoRequestDto requestDto);
  UserDto getUserInfo(int id);
  String uploadProfileImage(MultipartFile profileImage);
  void updateProfileImagePath(int id, String profileImagePath);
  UserDto getTeacherInfo(String nickname);
}
