package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface AuthRepository {
  UserDto matchUser(LoginRequestDto loginRequest);
  String checkIfExistEmail(String email);
}
