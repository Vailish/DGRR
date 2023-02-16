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
import com.ssafy.b102.data.dto.MyRankingDto;
import com.ssafy.b102.data.dto.SumScoreDto;
import com.ssafy.b102.data.dto.WinRateDto;
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
import com.ssafy.b102.response.dto.DataResponseDto;
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
			game.setSumScore(caculate(convertToList(usergame.getGameScore())).getSumDetail());
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
				String profileImg;
				
				switch(otherPlayergame.getUser().getStateMessage()) {
				case 0:
					profileImg = "https://media.istockphoto.com/id/1349239413/photo/shot-of-coffee-beans-and-a-cup-of-black-coffee-on-a-wooden-table.jpg?b=1&s=170667a&w=0&k=20&c=0bVq4jWM5d6r4Klp0si4um7QjZIQkMjYLtuDU7oWUps=";
					break;
				case 1:
					profileImg = "https://i.pinimg.com/736x/0f/75/1a/0f751a58eee57a23da8ca81f7dea561e.jpg";
					break;
				case 2:
					profileImg = "https://i.pinimg.com/736x/34/da/45/34da45b12e7c5ad7e0704f2020ba5e0a.jpg";
					break;
				case 3:
					profileImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtzaOrp_oZ3buPO0KQk1WF5qVwrVrj_T1Ckg&usqp=CAU";
					break;
				case 4:
					profileImg = "https://media.istockphoto.com/id/478348860/photo/chocolate-cake-with-chocolate-fudge-drizzled-icing-and-chocolate-curls.jpg?b=1&s=612x612&w=0&k=20&c=fW3zC1L7YFp7ZqowxaeKyxcOd9bo9bhzX-0tBthYIcg=";
					break;
				case 5:
					profileImg = "https://cdn.pixabay.com/photo/2014/06/30/11/40/cupcakes-380178__340.jpg";
					break;
				default :
					profileImg = "https://media.istockphoto.com/id/1349239413/photo/shot-of-coffee-beans-and-a-cup-of-black-coffee-on-a-wooden-table.jpg?b=1&s=170667a&w=0&k=20&c=0bVq4jWM5d6r4Klp0si4um7QjZIQkMjYLtuDU7oWUps=";
					break;
				}
				
				OtherPlayer otherPlayer = new OtherPlayer().builder()
						   								   .nickname(otherPlayergame.getUser().getNickname())
						   								   .profileImg(profileImg)
						   								   .score(convertToList(otherPlayergame.getGameScore()))
						   								   .sumScore(caculate(convertToList(otherPlayergame.getGameScore())).getSumDetail())
						   								   .rank(otherPlayergame.getGameRank())
						   								   .build();
				otherPlayers.add(otherPlayer);
			};
			game.setOtherPlayers(otherPlayers);
			games.add(game);
			
		}
		Collections.reverse(games);
		return new UserGamesResponseDto().builder()
				.nickname(nickname)
				.games(games)
				.build();
	}
		
	public GameResponseDto createGame(GameRequestDto gameRequestDto) {
		
		// 중복 입력 방지
		User me = userRepository.findByNickname(gameRequestDto.getNickname());
		List<Matching> matchings = matchingRepository.findAllByMatchingNumber(me.getMatching().getMatchingNumber());
		User opponent;
		if (matchings.get(0).getUser().getNickname().equals(me.getNickname())) {
			opponent = userRepository.findByNickname(matchings.get(0).getUser().getNickname());
		} else {
			opponent = userRepository.findByNickname(matchings.get(1).getUser().getNickname());
		}
		
		if(opponent.getMatching().getIsMatching() == 0) {
			return GameResponseDto.builder()
					.gameId(1L)
					.gameType(true)
					.gameDate(LocalDateTime.now())
					.gameDetail(null)
					.build();
		
		} else 
		// 저장을 아무도 안했을 때
		
		if (matchingRepository.findByMatchingNumberAndUserId(me.getMatching().getMatchingNumber(), opponent.getId()).getIsMatching() == 3) {
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
					
//					opponent.getMatching().setIsMatching(0);
					me.getMatching().setIsMatching(0);
//					matchingRepository.save(opponent.getMatching());
					matchingRepository.save(me.getMatching());
					
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
					
//					opponent.getMatching().setIsMatching(0);
					me.getMatching().setIsMatching(0);
//					matchingRepository.save(opponent.getMatching());
					matchingRepository.save(me.getMatching());
					
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
					
//					opponent.getMatching().setIsMatching(0);
					me.getMatching().setIsMatching(0);
//					matchingRepository.save(opponent.getMatching());
					matchingRepository.save(me.getMatching());
					
					return GameResponseDto.builder()
							.gameId(game.getId())
							.gameType(game.getGameType())
							.gameDate(game.getGameDate())
							.gameDetail(List.of(gamedetail4_1, gamedetail4_2, gamedetail4_3, gamedetail4_4))
							.build();
			}
			return null;
		}
		return null;
		
		
	}
	
	public String convertToString(List<Integer> datas) {
		
		StringBuilder data = new StringBuilder();
		data.append(datas.get(0));
		for (int i = 1; i < datas.size(); i++) {
			data.append(", " + datas.get(i));
			
		}
		return data.toString();
	}
	// 핀번호로 유저 정보 요청
	
	private List<Integer> convertToList(String data) {
		return Stream.of(data.split(", ")).mapToInt(Integer::parseInt).boxed().collect(Collectors.toList());
	}
	
	public MatchingResponseDto getMatchingProfile(Integer pinNumber) {
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
		
		WinRateDto win = winrate(user.getNickname());
		WinRate winrate = new WinRate(win.getTotalGame(), win.getWinGameNumber(), win.getTotalGame() - win.getWinGameNumber());
		List<WinRate> record = new ArrayList<>(List.of(winrate));
		Integer average = getUserPointsRank(user.getNickname()).getLast3GameAverageTotalScore();
		
		return matchingResponseDto.builder()
				.username(user.getUsername())
				.nickname(user.getNickname())
				.point(user.getPoints())
				.profile(null)
				.rank(myRank(user.getNickname()).getMyRank())
				.record(record)
				.average(average)
				.build();
	}
	
	private WinRateDto winrate(String nickname) {
	List<Game> onlineGames = gameRepository.findAllByGameType(true);
	User user = userRepository.findByNickname(nickname);
	Integer totalGameNumbers = 0;
	Integer WinGameNumbers = 0;
	for (Game onlineGame : onlineGames) {
		UserGame usergame = userGameRepository.findByUserIdAndGameId(user.getId(), onlineGame.getId());
		if (usergame != null) {
			totalGameNumbers += 1;
			if(usergame.getGameRank() == 1) {
				WinGameNumbers += 1;
			}
		}
	}
	return new WinRateDto(totalGameNumbers, WinGameNumbers);
	};
	
	private  MyRankingDto myRank(String nickname) {
		List<User> users = userRepository.findAllByOrderByPointsDesc();
		Integer rank = 0;
		for (User user : users) {
			rank += 1;
			if (user.getNickname().equals(nickname)) {
				return new MyRankingDto(rank);
			}
		}
		return null; 
	}
	
	private DataResponseDto getUserPointsRank(String nickname) {
//		전체 데이터를 가져온다
		User user = userRepository.findByNickname(nickname);
		List<Game> games = gameRepository.findAllByGameTypeOrderByGameDateDesc(true);
		
		Integer lastestGameTotalScore = 0;
		Integer Last3GameAverageTotalScore = 0;
		Integer cnt = 0;
		Integer HighestTotalScore = 0;
		
		
		for (Game game : games) {
			UserGame userGame = userGameRepository.findByUserIdAndGameId(user.getId(), game.getId());
			if (userGame == null) {
				continue;
			}
			else {
				Integer userGameScore = caculate(convertToList(userGame.getGameScore())).getTotalNum();
				if (lastestGameTotalScore == 0) {
					lastestGameTotalScore += userGameScore;
				}
				if (cnt < 2) {
					cnt += 1;
					Last3GameAverageTotalScore += userGameScore;
				} else if (cnt == 2) {Last3GameAverageTotalScore = (Last3GameAverageTotalScore + userGameScore) / 3; cnt += 1; System.out.println("ㅇㅅㅇ");}
				
				if (HighestTotalScore < userGameScore) {
					HighestTotalScore = userGameScore;
				}
			}
		}
		if (cnt == 2) {	
			lastestGameTotalScore = lastestGameTotalScore/2;
		}
		return new DataResponseDto(lastestGameTotalScore, Last3GameAverageTotalScore, HighestTotalScore);
	}
	
	private SumScoreDto caculate(List<Integer> score) {
		Integer totalScore = 0;
		List<Integer> scoreBoard = score;
		List<Integer> sumDetail = new ArrayList<>();
		for (int frameNumber = 1; frameNumber <= 10; frameNumber += 1) {
			Integer front = 2 * (frameNumber - 1);
			Integer back = 2 * (frameNumber - 1) + 1;
			
			// 10 10 10
			if (frameNumber == 10) {
				totalScore += scoreBoard.get(front) + scoreBoard.get(front+1) + scoreBoard.get(front+2);
			} else {
			
			// frameNmuber프레임의 점수
			
			// 스트라이크일 때 5
			if (scoreBoard.get(front) == 10) {
				// 더블 일 때 10 0 10 0
				if (scoreBoard.get(front+2) == 10) {
					// 터키 일 때 10 0 10 0 10 0
					if(scoreBoard.get(front+4) == 10) {totalScore += 30;} 
					else {totalScore += scoreBoard.get(front + 4) + 20;}}
				// 10 0 5 5
				else {totalScore += scoreBoard.get(front+2) + scoreBoard.get(front+3) +10;}}
			// 스페어일 떄 5 5 
			else if (scoreBoard.get(front) + scoreBoard.get(back) == 10) {totalScore += 10 + scoreBoard.get(front+2);}
			else {totalScore += scoreBoard.get(front) + scoreBoard.get(back);}
			}
			sumDetail.add(totalScore);
		}
		
		return new SumScoreDto(sumDetail, totalScore);
		}
		
		
		
	}