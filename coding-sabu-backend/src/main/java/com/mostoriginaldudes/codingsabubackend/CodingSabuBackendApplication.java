package com.mostoriginaldudes.codingsabubackend;

import com.mostoriginaldudes.codingsabubackend.config.FileUploadConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties({ FileUploadConfig.class })
@SpringBootApplication
public class CodingSabuBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodingSabuBackendApplication.class, args);
	}

}
