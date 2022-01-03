package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
  UserDto getUserInfoById(int id);
  void editUserInfo(EditUserInfoRequestDto editUserInfoRequest);
}
