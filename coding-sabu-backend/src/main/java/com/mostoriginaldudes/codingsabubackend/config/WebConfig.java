package com.mostoriginaldudes.codingsabubackend.config;

import com.mostoriginaldudes.codingsabubackend.interceptor.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@EnableWebMvc
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Value("${client.url}")
  private String allowedOrigin;

  private final AuthInterceptor authInterceptor;

  private final List<String> AddAuthInterceptorUrl = Arrays.asList(
    "/api/v1/user",
    "/api/v1/lesson/me", "/api/v1/lesson/**/student", "/api/v1/lesson/teachings",
    "/api/v1/lesson/**/lecture"
  );

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins(allowedOrigin)
      .allowCredentials(true)
      .allowedMethods("*")
      .exposedHeaders(HttpHeaders.AUTHORIZATION)
      .maxAge(3000);
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(authInterceptor)
      .addPathPatterns(AddAuthInterceptorUrl);
  }
}
