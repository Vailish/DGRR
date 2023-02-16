package com.ssafy.b102.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.Game;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.Entity.UserGame;
import com.ssafy.b102.data.dto.MyRankingDto;
import com.ssafy.b102.data.dto.Ranking;
import com.ssafy.b102.data.dto.SumScoreDto;
import com.ssafy.b102.data.dto.TotalRankingDto;
import com.ssafy.b102.data.dto.WinRateDto;
import com.ssafy.b102.persistence.dao.GameRepository;
import com.ssafy.b102.persistence.dao.UserGameRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.response.dto.DataResponseDto;
import com.ssafy.b102.response.dto.GraphData;
import com.ssafy.b102.response.dto.RankingResponseDto;
import com.ssafy.b102.response.dto.TwentyGameResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataService {
	
	public final GameRepository gameRepository;
	
	public final UserRepository userRepository;
	
	public final UserGameRepository userGameRepository;
	
	public List<GraphData> getGraphData(String nickname) {
		List<GraphData> graphDatas = new ArrayList<>();
		//
		User user = userRepository.findByNickname(nickname);
		List<UserGame> usergames = userGameRepository.findAllByUserIdOrderById(user.getId());
		
		Integer cnt = 0;
		for (UserGame usergame : usergames) {
			cnt += 1;
			if (cnt > 5) {
				break;
			}
			
			GraphData graphData = new GraphData();	
			graphData.setTotalScore(caculate(convertToList(usergame.getGameScore())).getTotalNum());
			graphData.setGameDate(usergame.getGame().getGameDate());
			
			graphDatas.add(graphData);
		}
		
		return graphDatas;
	}
	
//	해당유저와 주변 랭킹 정보 조회
	public DataResponseDto getUserPointsRank(String nickname) {
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
	
		
	public TotalRankingDto getTotalRanking() {
		List<User> users = userRepository.findAllByOrderByPointsDesc();
		List<Ranking> rankings = new ArrayList<>();
		
//		온라인 게임 id
		Integer rankingNumber = 0;
		if (users == null) {
			return null;
		}
		for (User user : users) {
			rankingNumber += 1;
			Integer totalGameNumber = winrate(user.getNickname()).getTotalGame();
			Integer winGameNumber = winrate(user.getNickname()).getWinGameNumber();
			Ranking ranking = new Ranking().builder()
					.ranking(rankingNumber)
					.nickname(user.getNickname())
					.point(user.getPoints())
					.totalGameNumber(totalGameNumber)
					.winGameNumber(winGameNumber)
					.LossesGameNumber(totalGameNumber - winGameNumber)
					.build();
			rankings.add(ranking);
		}
		return new TotalRankingDto(rankings.size()/20 + 1 ,rankings);
	}
	
	public TwentyGameResponseDto getTwentyGame(String nickname) {
		User user = userRepository.findByNickname(nickname);
		List<Game> games = gameRepository.findAllByGameTypeOrderByGameDateDesc(true); 
		Integer gameNumber = 0;
		Integer winGame = 0;
		
		// for문을 통해서 필요한 데이터 뽑아내기
		for (Game game : games) {
			// 21번째에서 탈출
			if (gameNumber > 19) {
				break;
			}
			// game이 user인 것을 확인
			UserGame thisGame = userGameRepository.findByUserIdAndGameId(user.getId(), game.getId());
			if (thisGame == null) {
				continue;
			}
			gameNumber += 1;
			
			if (thisGame.getGameRank() == 1) {
				winGame += 1;
			}
		}
		
		return new TwentyGameResponseDto().builder()
				.gameNumber(gameNumber)
				.winGame(winGame)
				.loseGame(gameNumber - winGame)
				.build();
	}
	
	public TotalRankingDto getTotalRankingPage(Integer pageNumber) {
		List<User> users = userRepository.findAllByOrderByPointsDesc();
		List<Ranking> rankings = new ArrayList<>();
		
//		온라인 게임 id
		if (users == null) {
			return null;
		}
		
		Integer startNumber = (pageNumber-1) * 20;
		Integer endNumber = pageNumber * 20;
		
		for(int number = startNumber; number < endNumber; number++) {
			
			if (number == users.size()) {break;}
			
			User user = users.get(number);
			Integer totalGameNumber = winrate(user.getNickname()).getTotalGame();
			Integer winGameNumber = winrate(user.getNickname()).getWinGameNumber();
			Ranking ranking = new Ranking().builder()
					.ranking(number + 1)
					.nickname(user.getNickname())
					.point(user.getPoints())
					.totalGameNumber(totalGameNumber)
					.winGameNumber(winGameNumber)
					.LossesGameNumber(totalGameNumber - winGameNumber)
					.build();
			rankings.add(ranking);
			
		}
		return new TotalRankingDto(rankings.size()/20 + 1 ,rankings);
		
		
		
		
	}
	
	// 내순위 포함 5명의 랭킹보기
	public List<RankingResponseDto> userRanking5(String nickname) {
		Integer headRank = 2;
		Integer tailRank = 2;
		
		Integer myRank = myRank(nickname).getMyRank();
		// 앞 순위 일때
		if (myRank == 1) {
			headRank = 0;
			tailRank = 4;
		} else if (myRank == 2) {
			headRank = 1;
			tailRank = 3;
		};
			
		// 뒷 순위 일때
		if (myRank == userRepository.findAll().size() -1) {
			headRank = 3;
			tailRank = 1;
		} else if (myRank == userRepository.findAll().size()) {
			headRank = 4;
			tailRank = 0;
		}
		
		List<RankingResponseDto> rankingResponseDtos = new ArrayList<>();
		List<User> users = userRepository.findAllByOrderByPointsDesc();
		Integer cnt = 0;
		Integer headNumber = 0;
		Integer tailNumber = 0;
		
		// 원하는 등수의 유저 뽑기
		for (User user : users) {
			cnt += 1;
			// 등수가 cnt  랭크가 1 , headRank 3 headnumber 0
			if (headNumber != headRank && cnt < myRank) {
				if (cnt >= myRank - headRank) {
					headNumber += 1;
					rankingResponseDtos.add(new RankingResponseDto(user.getNickname(), cnt, user.getPoints()));
				}
			}
			// 내 랭크 등록
			if (cnt == myRank) {
				Integer myPoint = userRepository.findByNickname(nickname).getPoints();
				rankingResponseDtos.add(new RankingResponseDto(nickname, myRank, myPoint));
			}

			if (tailNumber < tailRank && cnt > myRank) {
				if (tailNumber < tailRank) {
				tailNumber += 1;
				rankingResponseDtos.add(new RankingResponseDto(user.getNickname(), cnt, user.getPoints()));
				}
			}
			
				
		}
		return rankingResponseDtos;
	}
	
	public  MyRankingDto myRank(String nickname) {
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
	
	private List<Integer> convertToList(String data) {
		return Stream.of(data.split(", ")).mapToInt(Integer::parseInt).boxed().collect(Collectors.toList());
	}
}