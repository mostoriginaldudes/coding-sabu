package com.mostoriginaldudes.codingsabubackend;

import com.mostoriginaldudes.codingsabubackend.config.FileUploadConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties({ FileUploadConfig.class })
@SpringBootApplication
public class CodingSabuBackendApplication {

	public static final String APPLICATION_LOCATIONS = "spring.config.location="
		+ "classpath:application.yml";

	public static void main(String[] args) {
		new SpringApplicationBuilder(CodingSabuBackendApplication.class)
			.properties(APPLICATION_LOCATIONS)
			.run(args);
	}

}
