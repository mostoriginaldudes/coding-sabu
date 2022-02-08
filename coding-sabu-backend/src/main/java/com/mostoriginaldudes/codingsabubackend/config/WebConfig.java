package com.mostoriginaldudes.codingsabubackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Value("${client.url}")
  private String allowCorsUrl;

  @Value("${file.upload.location}")
  private String location;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins(allowCorsUrl)
            .allowedMethods("*")
            .maxAge(3000);
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/static/images/**")
      .addResourceLocations("file:///" + location)
      .setCachePeriod(3600)
      .resourceChain(true)
      .addResolver(new PathResourceResolver());
  }
}
