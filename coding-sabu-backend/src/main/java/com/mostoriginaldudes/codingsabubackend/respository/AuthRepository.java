package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.LoginDto;
import com.mostoriginaldudes.codingsabubackend.dto.SignupDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AuthRepository {
  UserDto matchUser(LoginDto login);
  String checkIfExistEmail(String email);
  void createUser(SignupDto signup);
}
