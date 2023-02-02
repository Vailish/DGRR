package com.ssafy.b102.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.Game;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.Entity.UserGame;
import com.ssafy.b102.persistence.dao.GameRepository;
import com.ssafy.b102.persistence.dao.UserGameRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.request.dto.GameData;
import com.ssafy.b102.request.dto.GameRequestDto;
import com.ssafy.b102.response.dto.GameResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameService {
	
	private final GameRepository gameRepository;
	
	private final UserRepository userRepository;
	
	private final UserGameRepository userGameRepository;

	public GameResponseDto getUserGames(String nickname) {
		// 닉네임으로 유저id 가져오기
		User user = userRepository.findByNickname(nickname);
		System.out.println("ㅇㅅㅇㅅㅇㅅㅇㅅㅇㅅㅇㅅㅇㅅㅇㅅㅇㅅㅇㅅㅇ"+nickname);
		UserGame usergame = userGameRepository.findAllByUserId(user.getId());
		

		System.out.println(usergame.toString());
		return GameResponseDto.builder()
				.gameId(1L)
				.gameType(true)
				.gameDate(LocalDateTime.now())
				.build();
	}
	
	public GameResponseDto createGame(GameRequestDto gameRequestDto) {
		// reqeustDto에서 데이터 분리하기
		Boolean gameType = gameRequestDto.getGameType();
		LocalDateTime gameDate = LocalDateTime.now();
		Game game = new Game();
		game.setGameDate(gameDate);
		game.setGameType(gameType);
		
		System.out.println("########################################################");
		System.out.println(gameRequestDto.getGameType().toString()); // true
		System.out.println("########################################################");
		System.out.println(gameRequestDto.getGameData().get(0).getNickname());
		System.out.println("########################################################");
		System.out.println(gameRequestDto.getGameData().size());
		
		
		// 게임 데이터를 하나씩 쪼개자 [{nickname, score}]
		switch(gameRequestDto.getGameData().size()) {
			case 2:
				String nickname2_1 = gameRequestDto.getGameData().get(0).getNickname();
				List<Integer> score2_1 = gameRequestDto.getGameData().get(0).getScore();
				
				String nickname2_2 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score2_2 = gameRequestDto.getGameData().get(1).getScore();
				
				UserGame userGame1 = new UserGame();
				UserGame userGame2 = new UserGame();
				
				userGame1.setGameScore(nickname2_1);
				userGame2.setGameScore(nickname2_2);

				int sum1 = score2_1.stream().mapToInt(Integer::intValue).sum();
				int sum2 = score2_2.stream().mapToInt(Integer::intValue).sum();
						
				if(sum1 >= sum2) {
					userGame1.setGameRank(1);
					userGame2.setGameRank(2);
				}
				else {
					userGame1.setGameRank(2);
					userGame2.setGameRank(1);
				};
				userGame1.setUser(userRepository.findByNickname(nickname2_1));
				userGame2.setUser(userRepository.findByNickname(nickname2_2));
				
				userGame1.setGame(game);
				userGame2.setGame(game);
				game.setUserGames(List.of(userGame1, userGame2));
				gameRepository.save(game);
				System.out.println("살려줘요~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				
				return GameResponseDto.builder()
						.gameId(game.getId())
						.gameType(game.getGameType())
						.gameDate(game.getGameDate())
						.gameDetail(List.of(userGame1, userGame2))
						.build();

			case 3:
				String nickname3_1 = gameRequestDto.getGameData().get(0).getNickname();
				List<Integer> score3_1 = gameRequestDto.getGameData().get(0).getScore();
				
				String nickname3_2 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score3_2 = gameRequestDto.getGameData().get(1).getScore();
				
				String nickname3_3 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score3_3 = gameRequestDto.getGameData().get(1).getScore();
				
				UserGame userGame3_1 = new UserGame();
				UserGame userGame3_2 = new UserGame();
				UserGame userGame3_3 = new UserGame();
				
				userGame3_1.setGameScore(nickname3_1);
				userGame3_2.setGameScore(nickname3_2);
				userGame3_3.setGameScore(nickname3_3);

				int sum3_1 = score3_1.stream().mapToInt(Integer::intValue).sum();
				int sum3_2 = score3_2.stream().mapToInt(Integer::intValue).sum();
				int sum3_3 = score3_2.stream().mapToInt(Integer::intValue).sum();
				
//				List<Integer> lst = new List<>([1, 2, 3,]);
//				if(sum1 >= sum2) {
//					userGame1.setGameRank(1);
//					userGame2.setGameRank(2);
//				}
//				else {
//					userGame1.setGameRank(2);
//					userGame2.setGameRank(1);
//				};
//				userGame1.setUser(userRepository.findByNickname(nickname2_1));
//				userGame2.setUser(userRepository.findByNickname(nickname2_2));
//				
//				userGame1.setGame(game);
//				userGame2.setGame(game);
//				game.setUserGames(List.of(userGame1, userGame2));
//				gameRepository.save(game);
//				System.out.println("살려줘요~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
//				
				return GameResponseDto.builder()
						.gameId(game.getId())
						.gameType(game.getGameType())
						.gameDate(game.getGameDate())
						.gameDetail(List.of(userGame3_1, userGame3_2, userGame3_3))
						.build();
			case 4:
				String nickname4_1 = gameRequestDto.getGameData().get(0).getNickname();
				List<Integer> score4_1 = gameRequestDto.getGameData().get(0).getScore();
				
				String nickname4_2 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score4_2 = gameRequestDto.getGameData().get(1).getScore();
				
				String nickname4_3 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score4_3 = gameRequestDto.getGameData().get(1).getScore();
				
				String nickname4_4 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score4_4 = gameRequestDto.getGameData().get(1).getScore();
				break;
		}
			
			
		return GameResponseDto.builder()
				.gameId(game.getId())
				.gameType(game.getGameType())
				.gameDate(game.getGameDate())
				.build();
		}
		
		


}





















