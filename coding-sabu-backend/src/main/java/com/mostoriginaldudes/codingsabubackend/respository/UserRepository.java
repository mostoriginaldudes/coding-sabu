package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.EditUserInfoDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserRepository {
  UserDto getUserInfoById(int id);
  void editUserInfo(EditUserInfoDto editUserInfo);
  String getPassword(int id);
  void editProfileImage(int id, String profileImage);
  UserDto getTeacherByNickname(String nickname);
}
