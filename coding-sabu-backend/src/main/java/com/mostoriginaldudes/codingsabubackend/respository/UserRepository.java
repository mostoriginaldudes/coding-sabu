package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserRepository {
  UserDto getUserInfoById(int id);
  void editUserInfo(EditUserInfoRequestDto editUserInfoRequest);
  void editProfileImage(int id, String profileImage);
}
