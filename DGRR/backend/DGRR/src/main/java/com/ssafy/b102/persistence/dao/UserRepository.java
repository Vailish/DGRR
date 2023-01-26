package com.ssafy.b102.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.b102.model.dto.UserDto;

public interface UserRepository extends JpaRepository<UserDto, String> {
	UserDto findOneById(String id);
	UserDto findByUsername(String username);
}