package com.mostoriginaldudes.codingsabubackend;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class CodingSabuBackendApplication {

	public static final String APPLICATION_LOCATIONS = "spring.config.location="
		+ "classpath:application.yml,"
		+ "classpath:aws.yml";

	public static void main(String[] args) {
		new SpringApplicationBuilder(CodingSabuBackendApplication.class)
			.properties(APPLICATION_LOCATIONS)
			.run(args);
	}
}
