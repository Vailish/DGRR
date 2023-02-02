package com.ssafy.b102.service;

import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.Game;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.persistence.dao.GameRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.response.dto.GameResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameService {
	
//	private final GameRepository gameRepository;
//	
////	private final UserRepository userRepository;
//
//	public GameResponseDto gameResponseDto;
//
//	public GameResponseDto getUserGames(String username) {
//		User user = userRepository.findByUsername(username);
//		Game game = gameRepository.findAllByUsername(username);
//		System.out.println(game.getGameDate());
//		return GameResponseDto.builder()
//				.gameType(game.getGameType())
//				.gameDate(game.getGameDate())
//				.build();
//	}

}
