package com.mostoriginaldudes.codingsabubackend.util.cookie;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import java.util.Arrays;
import java.util.Optional;

@Component
public class CookieParser {

  public Optional<String> parseCookie(String keyOfCookie, Cookie[] cookies) {
    return Optional.ofNullable(
      Arrays.stream(cookies)
        .filter(cookie -> keyOfCookie.equals(cookie.getName()))
        .findFirst()
        .map(Cookie::getValue)
        .orElse(null)
    );
  }
}
