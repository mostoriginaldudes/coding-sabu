package com.mostoriginaldudes.codingsabubackend.util.constant;

import org.springframework.http.HttpHeaders;

import java.util.UUID;

public class Constant {
  // Token
  public static final int EXPIRY_TIME = 30;
  public static final String TOKEN_ISSUER = "CodingSabu";
  public static final String AUTHORIZATION_HEADER = HttpHeaders.AUTHORIZATION;

  // Auth
  public static final String ENCRYPT_ALGORITHM = "SHA-256";
  public static final String ACCESS_TOKEN = "accessToken";
  public static final String REFRESH_TOKEN = "refreshToken";
  public static final String REFRESH_TOKEN_UUID = UUID.randomUUID().toString();
}
