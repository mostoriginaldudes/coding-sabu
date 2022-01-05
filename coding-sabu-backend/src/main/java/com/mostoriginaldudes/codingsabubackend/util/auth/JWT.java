package com.mostoriginaldudes.codingsabubackend.util.auth;

import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.IncorrectClaimException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.util.Date;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.SESSION_TIME;
import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.TOKEN_ISSUER;

@Component
public class JWT {
  @Value("${spring.jwt.secret}")
  private String key;
  private SecretKey secretKey;

  @PostConstruct
  protected void init() {
    this.secretKey = Keys.hmacShaKeyFor(key.getBytes());
  }

  public String issueJsonWebToken(LoginResponseDto loginResponse) {
    String subject = "coding-sabu";
    Date expiryDate = new Date(System.currentTimeMillis() + SESSION_TIME * 1000);

    Claims claims = Jwts.claims();
    claims.put("userInfo", loginResponse);

    return Jwts.builder()
      .setSubject(subject)
      .setExpiration(expiryDate)
      .setIssuer(TOKEN_ISSUER)
      .setClaims(claims)
      .signWith(secretKey)
      .compact();
  }

  public Claims verifyJsonWebToken(String jsonWebToken){
    try {
      return Jwts.parserBuilder()
        .setSigningKey(key.getBytes())
        .build()
        .parseClaimsJws(jsonWebToken)
        .getBody();
    } catch (ExpiredJwtException expiredJwtException) {
      expiredJwtException.printStackTrace();
      return null;
    } catch (IncorrectClaimException incorrectClaimException) {
      incorrectClaimException.printStackTrace();
      throw incorrectClaimException;
    }
  }
}
