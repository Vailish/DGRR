package com.ssafy.b102.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.Game;
import com.ssafy.b102.Entity.Matching;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.Entity.UserGame;
import com.ssafy.b102.persistence.dao.GameRepository;
import com.ssafy.b102.persistence.dao.MatchingRepository;
import com.ssafy.b102.persistence.dao.UserGameRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.request.dto.GameData;
import com.ssafy.b102.request.dto.GameRequestDto;
import com.ssafy.b102.response.dto.Games;
import com.ssafy.b102.response.dto.Games2;
import com.ssafy.b102.response.dto.MatchingResponseDto;
import com.ssafy.b102.response.dto.OtherPlayer;
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
	
	private final MatchingRepository matchingRepository;

	public UserGamesResponseDto getUserGames(String nickname, Integer gameType) {
		System.out.println("특정 유저의 게임정보 요청들어왔어유~~~~~~");
		// user닉네임으로 user를 가져와서
		User user = userRepository.findByNickname(nickname);
		// user id로 user가 들어간 게임들을 찾고
		List<UserGame> usergames = userGameRepository.findAllByUserId(user.getId());
		
		List<Games2> games = new ArrayList<>(); 
		
		for(UserGame usergame : usergames) { // 내게임 기준으로 하나씩 돌리는 거임
			// 0 이 전체, 1이 온라인 2가 오프라인 / true 온라인게임 false 오프라인게임
			if (usergame.getGame().getGameType() == true && gameType == 2) {
				continue;
			}
			
			if (usergame.getGame().getGameType() == false && gameType == 1) {
				continue;
			}	
			
			Games2 game = new Games2();
			// 내 게임정보를 먼저 저장
			game.setGameId(usergame.getGame().getId());
			game.setGameType(usergame.getGame().getGameType());
			game.setGameDate(usergame.getGame().getGameDate());
			game.setScore(convertToList(usergame.getGameScore()));
			game.setSumScore(sumScore(convertToList(usergame.getGameScore())));
			game.setRank(usergame.getGameRank());
			
			// 다른 유저들의 정보 저장

			List<OtherPlayer> otherPlayers = new ArrayList();
			
			// otherPlayes에 담을 otherPlayer 만들어서 담기
			List<UserGame> otherPlayerGames = userGameRepository.findAllByGameId(usergame.getGame().getId());
			for (UserGame otherPlayergame : otherPlayerGames) {
				// 검색 대상 유저 제외
				if (otherPlayergame.getUser().getNickname().equals(nickname)) {
					continue;
				};
				OtherPlayer otherPlayer = new OtherPlayer().builder()
						   								   .nickname(otherPlayergame.getUser().getNickname())
						   								   .score(convertToList(otherPlayergame.getGameScore()))
						   								   .sumScore(sumScore(convertToList(otherPlayergame.getGameScore())))
						   								   .rank(otherPlayergame.getGameRank())
						   								   .build();
				otherPlayers.add(otherPlayer);
			};
			System.out.println(otherPlayers);
			game.setOtherPlayers(otherPlayers);
			games.add(game);
			
		}
		
		return new UserGamesResponseDto().builder()
				.nickname(nickname)
				.games(games)
				.build();
	}
		
	public GameResponseDto createGame(GameRequestDto gameRequestDto) {

//		// 중복 요청 확인
//		// 온라인 게임
//		if (gameRequestDto.getGameType().equals(true)) {
//
//			// 다른 유저가 보냈는지 확인
//			String chkNic = gameRequestDto.getGameData().get(0).getNickname();
//			Long chkId = userRepository.findByNickname(chkNic).getId();
//			Matching chkMatching = matchingRepository.findByUserId(chkId); 
//			if (chkMatching.getResult().equals(true)) {
//				Long existId = chkMatching.getRecentGameId();
//				Game game = gameRepository.findByid(existId);
//				
//				// nickname gameScore gameRank
//				Games gamedetail1 = new Games();
//				Games gamedetail2 = new Games();
//				return GameResponseDto.builder()
//						.gameId(game.getId())
//						.gameType(game.getGameType())
//						.gameDate(game.getGameDate())
//						.gameDetail(List.of(gamedetail1, gamedetail2))
//						.build();
//			}
//			
//			
//			
//		}
		
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
				
				userGame1.setGameScore(convertToString(score2_1));
				userGame2.setGameScore(convertToString(score2_2));

				int sum1 = score2_1.stream().mapToInt(Integer::intValue).sum();
				int sum2 = score2_2.stream().mapToInt(Integer::intValue).sum();
				
				User user1 = userRepository.findByNickname(nickname2_1);
				User user2 = userRepository.findByNickname(nickname2_2);
				
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
				
//				Matching mat2_1 = matchingRepository.findByUserId(userGame1.getId());
//				Matching mat2_2 = matchingRepository.findByUserId(userGame2.getId());
//				mat2_1.setRecentGameId(game.getId());
//				mat2_2.setRecentGameId(game.getId());
//				matchingRepository.save(mat2_1);
//				matchingRepository.save(mat2_2);
				
				
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
				
//				Matching mat3_1 = matchingRepository.findByUserId(userGame3_1.getId());
//				Matching mat3_2 = matchingRepository.findByUserId(userGame3_2.getId());
//				Matching mat3_3 = matchingRepository.findByUserId(userGame3_3.getId());
//				mat3_1.setRecentGameId(game.getId());
//				mat3_2.setRecentGameId(game.getId());
//				mat3_3.setRecentGameId(game.getId());
//				matchingRepository.save(mat3_1);
//				matchingRepository.save(mat3_2);
//				matchingRepository.save(mat3_3);
				
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
				order4.sort(Comparator.reverseOrder()); 
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
				System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
				System.out.println(userGame4_1.getGameRank());
				System.out.println(userGame4_2.getGameRank());
				System.out.println(userGame4_3.getGameRank());
				System.out.println(userGame4_4.getGameRank());
				System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
				
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
				
//				Matching mat4_1 = matchingRepository.findByUserId(userGame4_1.getId());
//				Matching mat4_2 = matchingRepository.findByUserId(userGame4_2.getId());
//				Matching mat4_3 = matchingRepository.findByUserId(userGame4_3.getId());
//				Matching mat4_4 = matchingRepository.findByUserId(userGame4_4.getId());
//				mat4_1.setRecentGameId(game.getId());
//				mat4_2.setRecentGameId(game.getId());
//				mat4_3.setRecentGameId(game.getId());
//				mat4_4.setRecentGameId(game.getId());
//				matchingRepository.save(mat4_1);
//				matchingRepository.save(mat4_2);
//				matchingRepository.save(mat4_3);
//				matchingRepository.save(mat4_4);
				
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
	
	private List<Integer> convertToList(String data) {
		return Stream.of(data.split(", ")).mapToInt(Integer::parseInt).boxed().collect(Collectors.toList());
	}
	
	public MatchingResponseDto getMatchingProfile(Integer pinNumber) {
		System.out.println("핀번호로 유저 정보 요청이 들어왔습니다.");
		User user = userRepository.findByPin(pinNumber);
		System.out.println(pinNumber + " " + user.getNickname());
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
	
	// 점수 계산
	private List<Integer> sumScore(List<Integer> scores){
		List<Integer> sumScores = new ArrayList();
		Integer sumNumber = 0;
		for (Integer i = 1; i < 20; i = i + 2) {
			System.out.println("i : " + i);
			if (i == 10) {
				sumNumber +=scores.get(i - 1) + scores.get(i) + scores.get(i + 1); 
				sumScores.add(sumNumber);
			} else {
				sumNumber += scores.get(i - 1) + scores.get(i);
				sumScores.add(sumNumber);
			}
		}
		
		return sumScores;
	}
}
