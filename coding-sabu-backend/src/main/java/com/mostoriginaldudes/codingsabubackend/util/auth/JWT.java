package com.mostoriginaldudes.codingsabubackend.util.auth;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Component
public class JWT {
  @Value("spring.jwt.secret")
  private String secretKey;

  @PostConstruct
  protected void init() {
    this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
  }

  public String issueJsonWebToken(String email) {
    Date now = new Date();

    Claims claims = Jwts.claims().setSubject(email);
    claims.put("email", email);

    return Jwts.builder()
        .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
        .setClaims(claims)
        .setIssuer("coding-sabu")
        .setIssuedAt(now)
        .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis()))
        .signWith(SignatureAlgorithm.HS256, secretKey)
        .compact();
  }

  public Map<String, Object> verifyJsonWebToken(String jsonWebToken) throws UnsupportedEncodingException {
    Map<String, Object> claimMap = null;

    try {
      claimMap = Jwts.parser()
          .setSigningKey(secretKey.getBytes("UTF-8"))
          .parseClaimsJws(jsonWebToken)
          .getBody();
    } catch (ExpiredJwtException e) {
      e.printStackTrace();
    } catch (Exception e) {
      throw e;
    }
    return claimMap;
  }
}
