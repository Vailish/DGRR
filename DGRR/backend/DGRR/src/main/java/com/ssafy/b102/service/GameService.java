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
import com.ssafy.b102.request.dto.GameRequestDto;
import com.ssafy.b102.response.dto.GameDetail;
import com.ssafy.b102.response.dto.GameInfoResponseDto;
import com.ssafy.b102.response.dto.GameResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameService {
	
	private final GameRepository gameRepository;
	
	private final UserRepository userRepository;
	
	private final UserGameRepository userGameRepository;

	public List<GameInfoResponseDto> getUserGames(String nickname) {
		User user = userRepository.findByNickname(nickname);
		List<UserGame> usergames = userGameRepository.findAllByUserId(user.getId());

		System.out.println(usergames.toString());
		
		List<GameInfoResponseDto> gameInfoResponseDtos = new ArrayList<>();
		
		// 객체 뜯어서 필요한 정보 뽑기
//		for(int n = 0; n < gameInfoResponseDtos.size(); n++);
//			gameInfoResponseDtos.get(n);
		
		return gameInfoResponseDtos;
	}
	
	public GameResponseDto createGame(GameRequestDto gameRequestDto) {	
		Boolean gameType = gameRequestDto.getGameType();
		LocalDateTime gameDate = LocalDateTime.now();
		Game game = new Game();
		game.setGameDate(gameDate);
		game.setGameType(gameType);
		
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
				
				GameDetail gamedetail1 = new GameDetail(nickname2_1, score2_1, userGame1.getGameRank());
				GameDetail gamedetail2 = new GameDetail(nickname2_2, score2_2, userGame2.getGameRank());
				
				
				return GameResponseDto.builder()
						.gameId(game.getId())
						.gameType(game.getGameType())
						.gameDate(game.getGameDate())
						.gameDetail(List.of(gamedetail1, gamedetail2))
						.build();

			case 3:
				String nickname3_1 = gameRequestDto.getGameData().get(0).getNickname();
				List<Integer> score3_1 = gameRequestDto.getGameData().get(0).getScore();
				
				String nickname3_2 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score3_2 = gameRequestDto.getGameData().get(1).getScore();
				
				String nickname3_3 = gameRequestDto.getGameData().get(2).getNickname();
				List<Integer> score3_3 = gameRequestDto.getGameData().get(2).getScore();
				
				UserGame userGame3_1 = new UserGame();
				UserGame userGame3_2 = new UserGame();
				UserGame userGame3_3 = new UserGame();
				
				userGame3_1.setGameScore(nickname3_1);
				userGame3_2.setGameScore(nickname3_2);
				userGame3_3.setGameScore(nickname3_3);

				int sum3_1 = score3_1.stream().mapToInt(Integer::intValue).sum();
				int sum3_2 = score3_2.stream().mapToInt(Integer::intValue).sum();
				int sum3_3 = score3_3.stream().mapToInt(Integer::intValue).sum();
				
				List<Integer> order = new ArrayList<>(List.of(sum3_1,sum3_2,sum3_3));
				System.out.println(order.toString());
				for (int i = 0; i < order.size(); i++) {
					if (order.get(i) == sum3_1) {
						userGame3_1.setGameRank(i+1);
					} else if (order.get(i) == sum3_2) {
						userGame3_2.setGameRank(i+1);
					} else {
						userGame3_3.setGameRank(i+1);
					}
					
				}
				
				userGame3_1.setUser(userRepository.findByNickname(nickname3_1));
				userGame3_2.setUser(userRepository.findByNickname(nickname3_2));
				userGame3_3.setUser(userRepository.findByNickname(nickname3_3));
				
				userGame3_1.setGame(game);
				userGame3_2.setGame(game);
				userGame3_3.setGame(game);
				
				
				game.setUserGames(List.of(userGame3_1, userGame3_2, userGame3_3));
				gameRepository.save(game);
				
				GameDetail gamedetail3_1 = new GameDetail(nickname3_1, score3_1, userGame3_1.getGameRank());
				GameDetail gamedetail3_2 = new GameDetail(nickname3_2, score3_2, userGame3_2.getGameRank());
				GameDetail gamedetail3_3 = new GameDetail(nickname3_3, score3_3, userGame3_3.getGameRank());
				
				return GameResponseDto.builder()
						.gameId(game.getId())
						.gameType(game.getGameType())
						.gameDate(game.getGameDate())
						.gameDetail(List.of(gamedetail3_1, gamedetail3_2, gamedetail3_3))
						.build();
			case 4:
				String nickname4_1 = gameRequestDto.getGameData().get(0).getNickname();
				List<Integer> score4_1 = gameRequestDto.getGameData().get(0).getScore();
				
				String nickname4_2 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score4_2 = gameRequestDto.getGameData().get(1).getScore();
				
				String nickname4_3 = gameRequestDto.getGameData().get(2).getNickname();
				List<Integer> score4_3 = gameRequestDto.getGameData().get(2).getScore();
				
				String nickname4_4 = gameRequestDto.getGameData().get(3).getNickname();
				List<Integer> score4_4 = gameRequestDto.getGameData().get(3).getScore();
				
				UserGame userGame4_1 = new UserGame();
				UserGame userGame4_2 = new UserGame();
				UserGame userGame4_3 = new UserGame();
				UserGame userGame4_4 = new UserGame();
				
				userGame4_1.setGameScore(nickname4_1);
				userGame4_2.setGameScore(nickname4_2);
				userGame4_3.setGameScore(nickname4_3);
				userGame4_4.setGameScore(nickname4_4);

				int sum4_1 = score4_1.stream().mapToInt(Integer::intValue).sum();
				int sum4_2 = score4_2.stream().mapToInt(Integer::intValue).sum();
				int sum4_3 = score4_3.stream().mapToInt(Integer::intValue).sum();
				int sum4_4 = score4_4.stream().mapToInt(Integer::intValue).sum();
				
				List<Integer> order4 = new ArrayList<>(List.of(sum4_1,sum4_2, sum4_3, sum4_4));
				System.out.println(order4.toString());
				for (int i = 0; i < order4.size(); i++) {
					if (order4.get(i) == sum4_1) {
						userGame4_1.setGameRank(i+1);
					} else if (order4.get(i) == sum4_2) {
						userGame4_2.setGameRank(i+1);
					} else if (order4.get(i) == sum4_3) {
						userGame4_3.setGameRank(i+1);
					} else {
						userGame4_4.setGameRank(i+1);
					}
				}
				
				userGame4_1.setUser(userRepository.findByNickname(nickname4_1));
				userGame4_2.setUser(userRepository.findByNickname(nickname4_2));
				userGame4_3.setUser(userRepository.findByNickname(nickname4_3));
				userGame4_4.setUser(userRepository.findByNickname(nickname4_4));
				
				userGame4_1.setGame(game);
				userGame4_2.setGame(game);
				userGame4_3.setGame(game);
				userGame4_4.setGame(game);
				
				game.setUserGames(List.of(userGame4_1, userGame4_2, userGame4_3, userGame4_4));
				gameRepository.save(game);
				
				GameDetail gamedetail4_1 = new GameDetail(nickname4_1, score4_1, userGame4_1.getGameRank());
				GameDetail gamedetail4_2 = new GameDetail(nickname4_2, score4_2, userGame4_2.getGameRank());
				GameDetail gamedetail4_3 = new GameDetail(nickname4_3, score4_3, userGame4_3.getGameRank());
				GameDetail gamedetail4_4 = new GameDetail(nickname4_4, score4_4, userGame4_4.getGameRank());
				
				return GameResponseDto.builder()
						.gameId(game.getId())
						.gameType(game.getGameType())
						.gameDate(game.getGameDate())
						.gameDetail(List.of(gamedetail4_1, gamedetail4_2, gamedetail4_3, gamedetail4_4))
						.build();
		}
		return null;
	}
}
