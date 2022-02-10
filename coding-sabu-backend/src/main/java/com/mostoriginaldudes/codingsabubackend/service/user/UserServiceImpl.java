package com.mostoriginaldudes.codingsabubackend.service.user;

import com.mostoriginaldudes.codingsabubackend.auth.Security;
import com.mostoriginaldudes.codingsabubackend.config.FileUploadConfig;
import com.mostoriginaldudes.codingsabubackend.dto.EditUserInfoDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonListResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final FileUploadConfig fileUploadConfig;

  @Override
  @Transactional
  public EditUserInfoResponseDto editUserInfo(EditUserInfoRequestDto requestDto) {
    String encryptedPassword = Security.encrypt(requestDto.getPassword());

    EditUserInfoDto editUserInfoDto = EditUserInfoDto.builder()
      .id(requestDto.getId())
      .password(encryptedPassword)
      .nickname(requestDto.getNickname())
      .phoneNum(requestDto.getPhoneNum())
      .description(requestDto.getDescription())
      .profileImage(requestDto.getProfileImage())
      .build();

    userRepository.editUserInfo(editUserInfoDto);

    UserDto user = getUserInfo(editUserInfoDto.getId());

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
    String imagePath = UUID.randomUUID() + imageFileName;
    String imageRealFilePath = fileUploadConfig.getProfileLocation() + imagePath;
    String imageUrl = fileUploadConfig.getProfileUrl() + imagePath;

    try {
      FileOutputStream fileOutputStream = new FileOutputStream(imageRealFilePath);
      InputStream inputStream = profileImage.getInputStream();

      int fileReadCount = 0;
      byte[] imageFileBuffer = new byte[1024];

      while((fileReadCount = inputStream.read(imageFileBuffer)) != -1) {
        fileOutputStream.write(imageFileBuffer, 0, fileReadCount);
      }

      fileOutputStream.close();
      inputStream.close();

      return imageUrl;

    } catch(Exception e) {
      throw new RuntimeException("파일 업로드 에러 발생");
    }
  }

  @Override
  @Transactional
  public void updateProfileImagePath(int id, String profileImagePath) {
    userRepository.editProfileImage(id, profileImagePath);
  }

  @Override
  public UserDto getTeacherInfo(String nickname) {
    return userRepository.getTeacherByNickname(nickname);
  }
}
