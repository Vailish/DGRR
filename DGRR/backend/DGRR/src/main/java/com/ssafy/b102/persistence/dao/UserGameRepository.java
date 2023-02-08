package com.ssafy.b102.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.b102.Entity.User;
import com.ssafy.b102.Entity.UserGame;

public interface UserGameRepository extends JpaRepository<UserGame, String>{

	public List<UserGame> findAllByUserId(long id);
	public UserGame findByUserIdAndGameId(long userId, long gameId);
//	
	public List<UserGame> findAllByGameId(long id);
//	
}
