package com.mostoriginaldudes.codingsabubackend.respository;

import com.mostoriginaldudes.codingsabubackend.dto.request.LoginRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface AuthRepository {
  LoginResponseDto matchUser(LoginRequestDto loginRequest);
}
