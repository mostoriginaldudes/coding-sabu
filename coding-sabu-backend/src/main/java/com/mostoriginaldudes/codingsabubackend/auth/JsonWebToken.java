package com.mostoriginaldudes.codingsabubackend.auth;

import com.mostoriginaldudes.codingsabubackend.dto.response.LoginResponseDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.util.Date;

import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.SESSION_TIME;
import static com.mostoriginaldudes.codingsabubackend.util.constant.Constant.TOKEN_ISSUER;

@Component
public class JsonWebToken {

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

  public Claims verifyJsonWebToken(String jsonWebToken) {
    try {
      if (jsonWebToken.isEmpty()) {
        throw new MalformedJwtException("Token is not valid");
      }
      return Jwts.parserBuilder()
        .setSigningKey(key.getBytes())
        .build()
        .parseClaimsJws(jsonWebToken)
        .getBody();
    } catch(MalformedJwtException malformedJwtException) {
      malformedJwtException.printStackTrace();
      throw malformedJwtException;
    } catch (ExpiredJwtException expiredJwtException) {
      expiredJwtException.printStackTrace();
      throw expiredJwtException;
    } catch (IncorrectClaimException incorrectClaimException) {
      incorrectClaimException.printStackTrace();
      throw incorrectClaimException;
    }
  }
}