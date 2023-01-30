package com.ssafy.b102.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.b102.Entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	
	public User findOneById(String id);
	public User findByUsername(String username);
}