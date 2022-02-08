package com.mostoriginaldudes.codingsabubackend.auth;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.ENCRYPT_ALGORITHM;

@Component
public class Security {
  public static String encrypt(String text) {
    try {
      MessageDigest md = MessageDigest.getInstance(ENCRYPT_ALGORITHM);
      md.update(text.getBytes());

      return bytesToHex(md.digest());
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
      return null;
    }
  }

  private static String bytesToHex(byte[] bytes) {
    StringBuilder builder = new StringBuilder();
    for (byte b : bytes) {
      builder.append(String.format("%02x", b));
    }
    return builder.toString();
  }
}
