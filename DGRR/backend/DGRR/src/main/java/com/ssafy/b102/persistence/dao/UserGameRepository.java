package com.ssafy.b102.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.b102.Entity.UserGame;

public interface UserGameRepository extends JpaRepository<UserGame, String>{

	public List<UserGame> findAllByUserId(long id);
	
	public List<UserGame> findAllByGameId(long id);
	
}
