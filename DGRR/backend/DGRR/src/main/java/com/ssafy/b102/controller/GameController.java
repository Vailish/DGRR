package com.ssafy.b102.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.b102.response.dto.GameResponseDto;
import com.ssafy.b102.service.GameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2")
@RequiredArgsConstructor
public class GameController {
//	@Autowired
//	public GameService gameService;
//	
//	@GetMapping("/games/{nickname}")
//	public ResponseEntity<?> getUserGames(@PathVariable String nickname){
//		GameResponseDto gameResponseDto = gameService.getUserGames(nickname);
//		return new ResponseEntity<GameResponseDto>(gameResponseDto, HttpStatus.OK)
//	}
}

