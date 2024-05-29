package com.smhrd.namnam;

import com.smhrd.namnam.config.DataLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.smhrd.namnam.repository")
public class NamnamApplication implements CommandLineRunner {

	@Autowired
	private DataLoader dataLoader;

	public static void main(String[] args) {
		SpringApplication.run(NamnamApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		dataLoader.generateData();
	}

}
