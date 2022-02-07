package com.mostoriginaldudes.codingsabubackend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@ConfigurationProperties(prefix = "file.upload")
public class FileUploadConfig {

  @Setter
  private String location;
}
