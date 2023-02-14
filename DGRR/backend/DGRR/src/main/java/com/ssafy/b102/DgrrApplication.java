package com.ssafy.b102;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DgrrApplication {
	// 한국 시간설정
	void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("KST"));
	}
	
	public static void main(String[] args) {
		SpringApplication.run(DgrrApplication.class, args);
	}

}
