package com.mostoriginaldudes.codingsabubackend.dto.response;

public class LoginResponseDto {
  private final int id;
  private final String email;
  private final String nickname;
  private final String userType;
  private final String profileImage;

  public static class Builder {
    private int id;
    private String email;
    private String nickname;
    private String userType;
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

    public Builder profileImage(String profileImage) {
      this.profileImage = profileImage;
      return this;
    }

    public LoginResponseDto builder() {
      return new LoginResponseDto(this);
    }
  }

  private LoginResponseDto(Builder builder) {
    id = builder.id;
    email = builder.email;
    nickname = builder.nickname;
    userType = builder.userType;
    profileImage = builder.profileImage;
  }

  public int getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getNickname() {
    return nickname;
  }

  public String getUserType() {
    return userType;
  }

  public String getProfileImage() {
    return profileImage;
  }
}
