package com.mostoriginaldudes.codingsabubackend.service.user;

import com.mostoriginaldudes.codingsabubackend.auth.Security;
import com.mostoriginaldudes.codingsabubackend.dto.EditUserInfoDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.EditUserInfoRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.EditUserInfoResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.UserRepository;
import com.mostoriginaldudes.codingsabubackend.util.uploader.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final S3Uploader s3Uploader;

  @Override
  @Transactional
  public EditUserInfoResponseDto editUserInfo(EditUserInfoRequestDto requestDto, MultipartFile profileImage) {
    String profileUrl = getProfileOrElseOld(requestDto, profileImage);
    String encryptedPassword = getEncryptedOrElseOld(requestDto);

    EditUserInfoDto userInfo = EditUserInfoDto.builder()
      .id(requestDto.getId())
      .password(encryptedPassword)
      .nickname(requestDto.getNickname())
      .phoneNum(requestDto.getPhoneNum())
      .description(requestDto.getDescription())
      .profileImage(profileUrl)
      .build();

    userRepository.editUserInfo(userInfo);

    UserDto user = getUserInfo(requestDto.getId());
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

  private String getEncryptedOrElseOld(EditUserInfoRequestDto requestDto) {
    String oldPassword = userRepository.getPassword(requestDto.getId());
    Optional<String> newPassword = Optional.ofNullable(requestDto.getPassword());

    String encryptedPassword = oldPassword;
    if(!requestDto.getPassword().isEmpty() && newPassword.isPresent()) {
      encryptedPassword = Security.encrypt(newPassword.get());
    }

    return encryptedPassword;
  }

  private String getProfileOrElseOld(EditUserInfoRequestDto requestDto, MultipartFile profileImage) {
    UserDto user = getUserInfo(requestDto.getId());

    if(profileImage == null) {
      return user.getProfileImage();
    } else {
      return uploadProfileImage(profileImage);
    }
  }

  @Override
  public UserDto getUserInfo(int id) {
    return userRepository.getUserInfoById(id);
  }

  @Override
  public String uploadProfileImage(MultipartFile profileImage) {
    try {
      return s3Uploader.uploadFile(profileImage, "profile");
    } catch (IOException e) {
      e.printStackTrace();
      return e.getMessage();
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
