package com.ssafy.b102.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.b102.request.dto.GameRequestDto;
import com.ssafy.b102.response.dto.GameInfoResponseDto;
import com.ssafy.b102.response.dto.GameResponseDto;
import com.ssafy.b102.service.GameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class GameController {
	
	@Autowired
	public GameService gameService;

	// 테스트용, 후에 삭제예정
//	@GetMapping("/games/{nickname}")
//	public ResponseEntity<?> dummy(@PathVariable String nickname){
//		
//		GameDetail gameDetail1 = new GameDetail("아이유", List.of(10, 0, 10, 0, 9, 1, 8, 1, 6, 2, 5, 5, 10, 0, 7, 2, 4, 4, 10, 10, 10), 1);
//		GameDetail gameDetail2 = new GameDetail("태연", List.of(7, 3, 8, 2, 9, 1, 8, 1, 6, 2, 5, 5, 10, 0, 7, 2, 4, 4, 10, 8, 2), 2);
//		GameDetail gameDetail3 = new GameDetail("아이린", List.of(5, 3, 4, 2, 3, 1, 8, 1, 3, 2, 5, 5, 7, 0, 7, 2, 4, 4, 9, 1, 2), 3);
//		GameDetail gameDetail4 = new GameDetail("수지", List.of(2, 1, 3, 2, 3, 2, 4, 2, 0, 2, 2, 5, 2, 0, 1, 1, 4, 4, 1, 1, 2), 4);
//		
//		GameInfoResponseDto gameInfoResponseDto = new GameInfoResponseDto(1L, false, LocalDateTime.now(), List.of(gameDetail1, gameDetail2, gameDetail3, gameDetail4));
//		
//		return new ResponseEntity<GameInfoResponseDto>(gameInfoResponseDto, HttpStatus.OK);
//	}
	
	
//	@GetMapping("/games/{nickname}")
	@GetMapping("/games/{nickname}")
	public ResponseEntity<?> getUserGames(@PathVariable String nickname){
		List<GameInfoResponseDto> gameInfoResponseDtos = gameService.getUserGames(nickname);
		return new ResponseEntity<List<GameInfoResponseDto>>(gameInfoResponseDtos, HttpStatus.OK);
	}
	
	@PostMapping("/game")
	public ResponseEntity<?> createGame(@RequestBody GameRequestDto gameRequestDto){
		GameResponseDto gameResponseDto = gameService.createGame(gameRequestDto);
		return new ResponseEntity<GameResponseDto>(gameResponseDto, HttpStatus.OK);
	}
	
}

