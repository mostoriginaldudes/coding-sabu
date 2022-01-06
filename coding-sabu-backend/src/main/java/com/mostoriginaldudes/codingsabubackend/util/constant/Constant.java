package com.mostoriginaldudes.codingsabubackend.util.constant;

import org.springframework.http.HttpHeaders;

public class Constant {
  // Token
  public static final int SESSION_TIME = 30;
  public static final String TOKEN_ISSUER = "CodingSabu";
  public static final String AUTHORIZATION_HEADER = HttpHeaders.AUTHORIZATION.toLowerCase();

  // Auth
  public static final String ENCRYPT_ALGORITHM= "SHA-256";
}
