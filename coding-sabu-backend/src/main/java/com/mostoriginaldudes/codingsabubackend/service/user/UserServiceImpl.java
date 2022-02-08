package com.mostoriginaldudes.codingsabubackend.service.user;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.UserRepository;
import com.mostoriginaldudes.codingsabubackend.auth.Security;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
  
  private final UserRepository userRepository;

  @Value("${server.asset.img}")
  private String filePath;

  @Override
  @Transactional
  public EditUserInfoResponseDto editUserInfo(EditUserInfoRequestDto editUserInfoRequest) {
    String encryptedPassword = Security.encrypt(editUserInfoRequest.getPassword());
    editUserInfoRequest.setPassword(encryptedPassword);
    userRepository.editUserInfo(editUserInfoRequest);

    UserDto user = getUserInfo(editUserInfoRequest.getId());
    return EditUserInfoResponseDto.builder()
      .id(user.getId())
      .email(user.getEmail())
      .nickname(user.getNickname())
      .userType(user.getUserType())
      .phoneNum(user.getPhoneNum())
      .description(user.getDescription())
      .profileImage(user.getProfileImage())
      .build();
  }

  @Override
  public UserDto getUserInfo(int id) {
    return userRepository.getUserInfoById(id);
  }

  @Override
  @Transactional
  public String uploadProfileImage(MultipartFile profileImage) {
    String imageFileName = profileImage.getOriginalFilename();
    String imageFilePath = filePath + imageFileName;

    try {
      FileOutputStream fileOutputStream = new FileOutputStream(imageFilePath);
      InputStream inputStream = profileImage.getInputStream();

      int fileReadCount = 0;
      byte[] imageFileBuffer = new byte[1024];

      while((fileReadCount = inputStream.read(imageFileBuffer)) != -1) {
        fileOutputStream.write(imageFileBuffer, 0, fileReadCount);
      }

      fileOutputStream.close();
      inputStream.close();
    } catch(Exception e) {
      throw new RuntimeException("파일 업로드 에러 발생");
    }
    return imageFilePath;
  }

  @Override
  @Transactional
  public String updateProfileImagePath(int id, String profileImagePath) {
    userRepository.editProfileImage(id, profileImagePath);
    return profileImagePath;
  }

  @Override
  public UserDto getTeacherInfo(String nickname) {
    return userRepository.getTeacherByNickname(nickname);
  }
}
