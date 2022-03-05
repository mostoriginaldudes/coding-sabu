package com.mostoriginaldudes.codingsabubackend.auth;

import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.*;

@Component
public class JsonWebToken {

  @Value("${spring.jwt.secret}")
  private String key;
  private SecretKey secretKey;

  @PostConstruct
  protected void init() {
    this.secretKey = Keys.hmacShaKeyFor(key.getBytes());
  }

  public String issueJsonWebToken(String claimKey, UserDto user) {
    String subject = "coding-sabu " + claimKey;

    long expiryMs = System.currentTimeMillis();
    if(claimKey.equals(ACCESS_TOKEN)) {
      expiryMs += Duration.ofMinutes(EXPIRY_TIME).toMillis();
    } else {
      expiryMs += Duration.ofDays(14).toMillis();
    }
    Date expiryDate = new Date(expiryMs);

    return Jwts.builder()
      .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
      .setSubject(subject)
      .setIssuer(TOKEN_ISSUER)
      .setIssuedAt(new Date())
      .setExpiration(expiryDate)
      .signWith(secretKey, SignatureAlgorithm.HS512)
      .addClaims(getClaim(claimKey, user))
      .compact();
  }

  private Map<String, Object> getClaim(String claimKey, UserDto user) {
    Map<String, Object> claims = new HashMap<>();

    if (REFRESH_TOKEN.equals(claimKey)) {
      claims.put(REFRESH_TOKEN, REFRESH_TOKEN_UUID);
    }
    claims.put("id", user.getId());
    claims.put("email", user.getEmail());
    claims.put("nickname", user.getNickname());
    claims.put("userType", user.getUserType());
    claims.put("phoneNum", user.getPhoneNum());
    return claims;
  }

  public Claims verifyJsonWebToken(String jsonWebToken) throws JwtException {
    try {
      if (jsonWebToken.isEmpty()) {
        throw new MalformedJwtException("Token is not valid");
      }

      return Jwts.parserBuilder()
        .setSigningKey(key.getBytes())
        .build()
        .parseClaimsJws(jsonWebToken)
        .getBody();
    } catch (JwtException e) {
      e.printStackTrace();
      throw e;
    }
  }
}
