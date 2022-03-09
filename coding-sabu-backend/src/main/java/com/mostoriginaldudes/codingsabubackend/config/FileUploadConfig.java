package com.mostoriginaldudes.codingsabubackend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Setter
@Getter
@ConfigurationProperties(prefix = "file.upload")
public class FileUploadConfig {

  private String location;
  private String url;
  private String thumbnailLocation;
  private String thumbnailUrl;
  private String profileLocation;
  private String profileUrl;
}
