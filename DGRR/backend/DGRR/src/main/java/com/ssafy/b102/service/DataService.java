package com.ssafy.b102.service;

import java.util.ArrayList;
import java.util.List;

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
		return new DataResponseDto(1,1,1);
	}
	
		
	public TotalRankingDto getTotalRanking() {
		List<User> users = userRepository.findAllByOrderByPointsDesc();
		List<Ranking> rankings = new ArrayList<>();
		
		System.out.println(users.toString());
		System.out.println(winrate("ttest01").toString());
		
//		온라인 게임 id
		Integer rankingNumber = 0;
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

}
