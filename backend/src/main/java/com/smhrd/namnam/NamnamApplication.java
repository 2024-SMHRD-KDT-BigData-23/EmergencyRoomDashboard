package com.smhrd.namnam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.smhrd.namnam.repository")
public class NamnamApplication {

	public static void main(String[] args) {
		SpringApplication.run(NamnamApplication.class, args);
	}

}
