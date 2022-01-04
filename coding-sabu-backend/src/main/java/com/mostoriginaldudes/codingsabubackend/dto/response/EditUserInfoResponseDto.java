package com.mostoriginaldudes.codingsabubackend.dto.response;

public class EditUserInfoResponseDto {
  private final int id;
  private final String email;
  private final String nickname;
  private final String userType;
  private final String phoneNum;
  private final String description;
  private final String profileImage;

  public static class Builder {
    private int id;
    private String email;
    private String nickname;
    private String userType;
    private String phoneNum;
    private String description;
    private String profileImage;

    public Builder id(int id) {
      this.id = id;
      return this;
    }

    public Builder email(String email) {
      this.email = email;
      return this;
    }

    public Builder nickname(String nickname) {
      this.nickname = nickname;
      return this;
    }

    public Builder userType(String userType) {
      this.userType = userType;
      return this;
    }

    public Builder phoneNum(String phoneNum) {
      this.phoneNum = phoneNum;
      return this;
    }

    public Builder description(String description) {
      this.description = description;
      return this;
    }

    public Builder profileImage(String profileImage) {
      this.profileImage = profileImage;
      return this;
    }

    public EditUserInfoResponseDto builder() {
      return new EditUserInfoResponseDto(this);
    }
  }

  private EditUserInfoResponseDto(Builder builder) {
    id = builder.id;
    email = builder.email;
    nickname = builder.nickname;
    userType = builder.userType;
    phoneNum = builder.phoneNum;
    description = builder.description;
    profileImage = builder.profileImage;
  }
}
