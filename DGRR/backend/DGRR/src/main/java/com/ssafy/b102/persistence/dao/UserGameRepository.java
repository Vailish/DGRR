package com.ssafy.b102.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.b102.Entity.UserGame;

public interface UserGameRepository extends JpaRepository<UserGame, String>{

	public UserGame findAllByUserId(long id);
	
}
