package com.ssafy.b102.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.b102.Entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	//로그인
	public User findByUsername(String username);
	
	public User findOneById(String id);
	public User findByNickname(String nickname);
	public User findByEmail(String email);
	public User findByPin(Integer pin);
}