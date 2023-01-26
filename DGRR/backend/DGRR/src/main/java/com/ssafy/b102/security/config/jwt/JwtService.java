package com.ssafy.b102.security.config.jwt;

import org.springframework.beans.factory.annotation.Value;

import com.ssafy.b102.persistence.dao.UserRepository;

public class JwtService {
	@Value("${jwt.secret}")
	private String SECRET_KEY;
//	private final UserRepository userRepository;
	
	
}
