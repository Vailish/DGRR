package com.ssafy.b102.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
import com.ssafy.b102.response.dto.Games;
import com.ssafy.b102.response.dto.MatchingResponseDto;
import com.ssafy.b102.response.dto.UserGamesResponseDto;
import com.ssafy.b102.response.dto.WinRate;
import com.ssafy.b102.response.dto.GameResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameService {
	
	private final GameRepository gameRepository;
	
	private final UserRepository userRepository;
	
	private final UserGameRepository userGameRepository;

	public List<UserGamesResponseDto> getUserGames(String nickname) {
		// user닉네임으로 user를 가져와서
		User user = userRepository.findByNickname(nickname);
		// user id로 user가 들어간 게임들을 찾고
		List<UserGame> usergames = userGameRepository.findAllByUserId(user.getId());
		System.out.println(usergames.toString());
		// game id를 가져와서
		System.out.println(usergames.get(0).getGame().getId());
		System.out.println(usergames.get(0).getGame().getGameType());
		
		System.out.println(usergames.get(1).getGame().getId());
		

		// [{Game},{Game}]
		
		// return 값을 미리 생성하고
		List<UserGamesResponseDto> userGamesResponseDtos = new ArrayList<>();
		// for문을 통해서 하나씩 responseDto에 맞춰서 형식을 변경하여 return값에 넣어줍니다.
		for(Integer i = 0; i < usergames.size(); i++) {
			for(Integer k = 0; k < usergames.get(i);k++) {
				
			}
			Games game = new Games();
			
			UserGamesResponseDto gameInfoRes = new UserGamesResponseDto();
			usergames.get(0);
		}
		
		// 객체 뜯어서 필요한 정보 뽑기
//		for(int n = 0; n < gameInfoResponseDtos.size(); n++);
//			gameInfoResponseDtos.get(n);
		
		return userGamesResponseDtos;
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
				System.out.println();
				
				
				String nickname2_2 = gameRequestDto.getGameData().get(1).getNickname();
				List<Integer> score2_2 = gameRequestDto.getGameData().get(1).getScore();
				
				UserGame userGame1 = new UserGame();
				UserGame userGame2 = new UserGame();
				
				userGame1.setGameScore(convertToString(score2_1));
				userGame2.setGameScore(convertToString(score2_2));

				int sum1 = score2_1.stream().mapToInt(Integer::intValue).sum();
				int sum2 = score2_2.stream().mapToInt(Integer::intValue).sum();
				
				User user1 = userRepository.findByNickname(nickname2_1);
				User user2 = userRepository.findByNickname(nickname2_2);
				
				if (user1.getPoints() == null) {
					user1.setPoints(1000);
				}
				if (user2.getPoints() == null) {
					user2.setPoints(1000);
				}
				
				if(sum1 >= sum2) {
					userGame1.setGameRank(1);
					userGame2.setGameRank(2);
					
					user1.setPoints(user1.getPoints() + 40);
					user2.setPoints(user2.getPoints() - 40);
					
				}
				else {
					userGame1.setGameRank(2);
					userGame2.setGameRank(1);
					
					user2.setPoints(user2.getPoints() + 40);
					user1.setPoints(user1.getPoints() - 40);
				};
				userGame1.setUser(userRepository.findByNickname(nickname2_1));
				userGame2.setUser(userRepository.findByNickname(nickname2_2));
				
				userGame1.setGame(game);
				userGame2.setGame(game);
				game.setUserGames(List.of(userGame1, userGame2));
				gameRepository.save(game);
				
				Games gamedetail1 = new Games(nickname2_1, score2_1, userGame1.getGameRank());
				Games gamedetail2 = new Games(nickname2_2, score2_2, userGame2.getGameRank());
				
				
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
				
				userGame3_1.setGameScore(convertToString(score3_1));
				userGame3_2.setGameScore(convertToString(score3_2));
				userGame3_3.setGameScore(convertToString(score3_3));

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
				
				Games gamedetail3_1 = new Games(nickname3_1, score3_1, userGame3_1.getGameRank());
				Games gamedetail3_2 = new Games(nickname3_2, score3_2, userGame3_2.getGameRank());
				Games gamedetail3_3 = new Games(nickname3_3, score3_3, userGame3_3.getGameRank());
				
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
				
				userGame4_1.setGameScore(convertToString(score4_1));
				userGame4_2.setGameScore(convertToString(score4_2));
				userGame4_3.setGameScore(convertToString(score4_3));
				userGame4_4.setGameScore(convertToString(score4_4));

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
				
				Games gamedetail4_1 = new Games(nickname4_1, score4_1, userGame4_1.getGameRank());
				Games gamedetail4_2 = new Games(nickname4_2, score4_2, userGame4_2.getGameRank());
				Games gamedetail4_3 = new Games(nickname4_3, score4_3, userGame4_3.getGameRank());
				Games gamedetail4_4 = new Games(nickname4_4, score4_4, userGame4_4.getGameRank());
				
				return GameResponseDto.builder()
						.gameId(game.getId())
						.gameType(game.getGameType())
						.gameDate(game.getGameDate())
						.gameDetail(List.of(gamedetail4_1, gamedetail4_2, gamedetail4_3, gamedetail4_4))
						.build();
		}
		return null;
	}
	
	public String convertToString(List<Integer> datas) {
		
		StringBuilder data = new StringBuilder();
		data.append(datas.get(0));
		for (int i = 0; i < datas.size(); i++) {
			data.append(", " + datas.get(i));
			
		}
		return data.toString();
	}
	// 핀번호로 유저 정보 요청
	public MatchingResponseDto getMatchingProfile(Integer pinNumber) {
		System.out.println("핀번호로 유저 정보 요청이 들어왔습니다.");
		User user = userRepository.findByPin(pinNumber);
		MatchingResponseDto matchingResponseDto = new MatchingResponseDto();
		
		if (user == null) {
			return matchingResponseDto;
		}
		
		if (user.getPin() == null) {
			return matchingResponseDto;
		}
		LocalDateTime createdtime = user.getPinCreateTime();
		LocalDateTime now = LocalDateTime.now();
		long seconds = ChronoUnit.SECONDS.between(createdtime, now);
		
		// 시간 만료 토큰 삭제
		if (seconds > 300) {
			user.setPin(null);
			user.setPinCreateTime(null);
			userRepository.save(user);
			return matchingResponseDto;
		}
		
		
		WinRate winrate = new WinRate(10, 7, 3);
		List<WinRate> record = new ArrayList<>(List.of(winrate));
		Integer average = 163;
		
		return matchingResponseDto.builder()
				.username(user.getUsername())
				.nickname(user.getNickname())
				.profile(null)
				.rank(50)
				.record(record)
				.average(average)
				.build();
	}
}
