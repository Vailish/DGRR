package com.ssafy.b102.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.b102.Entity.Game;

public interface GameRepository extends JpaRepository<Game, String>{
	public List<Game> findAllByGameType(Boolean gameType);
}
