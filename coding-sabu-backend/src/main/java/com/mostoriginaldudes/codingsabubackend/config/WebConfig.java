package com.mostoriginaldudes.codingsabubackend.config;

import com.mostoriginaldudes.codingsabubackend.interceptor.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@EnableWebMvc
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Value("${client.url}")
  private String allowCorsUrl;

  @Value("${file.upload.location}")
  private String location;

  private final AuthInterceptor authInterceptor;

  private final List<String> AddAuthInterceptorUrl = Arrays.asList(
    "/user",
    "/auth/logout",
    "/lesson", "/lesson/**/student"
  );

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins(allowCorsUrl)
      .allowCredentials(true)
      .allowedMethods("*")
      .exposedHeaders(HttpHeaders.AUTHORIZATION)
      .maxAge(3000);
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/static/images/**")
      .addResourceLocations("file:///" + location)
      .setCachePeriod(3600)
      .resourceChain(true)
      .addResolver(pathResourceResolver());
  }

  @Bean
  public PathResourceResolver pathResourceResolver() {
    return new PathResourceResolver();
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(authInterceptor)
      .addPathPatterns(AddAuthInterceptorUrl);

  }
}
