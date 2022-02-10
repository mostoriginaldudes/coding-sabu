package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.EditUserInfoDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserRepository {
  UserDto getUserInfoById(int id);
  void editUserInfo(EditUserInfoDto editUserInfo);
  void editProfileImage(int id, String profileImage);
  UserDto getTeacherByNickname(String nickname);
}
