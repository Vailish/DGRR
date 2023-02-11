package com.ssafy.b102.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.Game;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.Entity.UserGame;
import com.ssafy.b102.data.dto.Ranking;
import com.ssafy.b102.data.dto.TotalRankingDto;
import com.ssafy.b102.data.dto.WinRateDto;
import com.ssafy.b102.persistence.dao.GameRepository;
import com.ssafy.b102.persistence.dao.UserGameRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.response.dto.DataResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataService {
	
	public final GameRepository gameRepository;
	
	public final UserRepository userRepository;
	
	public final UserGameRepository userGameRepository;
	
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
				Integer userGameScore = caculate(convertToList(userGame.getGameScore()));
				System.out.println(userGameScore);
				if (lastestGameTotalScore == 0) {
					lastestGameTotalScore += userGameScore;
				}
				if (cnt < 3) {
					cnt += 1;
					Last3GameAverageTotalScore += userGameScore;
				} else if (cnt == 3) {Last3GameAverageTotalScore = (Last3GameAverageTotalScore + userGameScore) / 3; cnt += 1;}
				
				if (HighestTotalScore < userGameScore) {
					HighestTotalScore = userGameScore;
				}
				System.out.println(Last3GameAverageTotalScore);
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
		return new TotalRankingDto(rankings);
	}
	
	public TotalRankingDto getTotalRankingPage(Integer pageNumber) {
		List<User> users = userRepository.findAllByOrderByPointsDesc();
		List<Ranking> rankings = new ArrayList<>();
		
//		온라인 게임 id
		Integer rankingNumber = pageNumber * 20;
		if (users == null || users.size() <= rankingNumber) {
			return null;
		}
		 
//		for (User user : users) {
		for (Integer n = 0; n < users.size(); n ++) {
			User user = users.get(n);
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
		return new TotalRankingDto(rankings);
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
	
	private Integer caculate(List<Integer> score) {
		Integer result = 0;
		for (int num = 0; num < score.size(); num++) {
			result += num;
		}
		return result;
	}
	
	private List<Integer> convertToList(String data) {
		return Stream.of(data.split(", ")).mapToInt(Integer::parseInt).boxed().collect(Collectors.toList());
	}
}