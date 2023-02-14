package com.ssafy.b102.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.Matching;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.persistence.dao.GameRepository;
import com.ssafy.b102.persistence.dao.MatchingRepository;
import com.ssafy.b102.persistence.dao.UserGameRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.request.dto.GamingRequestDto;
import com.ssafy.b102.request.dto.MatchingRequestDto;
import com.ssafy.b102.response.dto.GamingResponseDto;
import com.ssafy.b102.response.dto.MatchingJoinResponseDto;
import com.ssafy.b102.response.dto.MatchingResponseDto;
import com.ssafy.b102.response.dto.MatchingResultResponseDto;
import com.ssafy.b102.response.dto.WinRate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatchingService {
	
	public final UserRepository userRepository;
	
	public final MatchingRepository matchingRepository;
	
	public final GameRepository gameRepository;
	
	public final UserGameRepository userGameRepository;
	
	public MatchingJoinResponseDto joiningMatchingGame(MatchingRequestDto matchingRequestDto) {
		System.out.println("대기열 참가 요청이 들어왔습니다." + matchingRequestDto.getNickname());
		User user = userRepository.findByNickname(matchingRequestDto.getNickname());
		if (matchingRepository.findByUserId(user.getId()) == null) {
			Matching matching = new Matching();
			matching.setUser(user);
			matching.setIsMatching(0);
			matching.setJoinTime(LocalDateTime.now());
			user.setMatching(matching);
			matchingRepository.save(matching);
		};
			
		if (user.getMatching().getIsMatching() == 0) {
			// 포인트별 정렬을 위한 최신화
			user.getMatching().setPoint(user.getPoints());
			user.getMatching().setIsMatching(1);
			user.getMatching().setJoinTime(LocalDateTime.now());
			matchingRepository.save(user.getMatching());
			return new MatchingJoinResponseDto("대기열에 참가하였습니다." + matchingRequestDto.getNickname());
		} else {
			System.out.println(matchingRepository.findAll().toString());
			return null;
		}
	}
	public MatchingResponseDto matchingResult(MatchingRequestDto matchingRequestDto) {
		User user = userRepository.findByNickname(matchingRequestDto.getNickname());
		Matching matching = matchingRepository.findByUserId(user.getId());
//		매칭여부 확인
		System.out.println("매칭결과 요청왔어요");
		if (matching == null || matching.getIsMatching() == 0) {
			return null;
		}
		
		if (matching.getIsMatching() == 2) {
			List<Matching> checkMatchings = matchingRepository.findAllByMatchingNumber(matching.getMatchingNumber());
			for (Matching checkMatching : checkMatchings) {
				if (checkMatching.getUser().getId() == user.getId()) {
					continue;
				}
				matching.setIsMatching(0);
				matching.setGameData(null);
				matching.setResult(false);
				matchingRepository.save(matching);
				return makeMatchingResponseDto(checkMatching.getUser().getNickname());
						
//						(checkMatching.getUser().getNickname());
			}
		}
//		대기열 확인
//		List<Matching> matchings = matchingRepository.findAllByOrderByPoint();
		List<Matching> matchings = matchingRepository.findAllByIsMatchingOrderByPoint(1);
		if (matchings.size() < 2) {
			return null;
		} else {
			// 100점 이내
			for (Matching mat : matchings) {
				Integer opponentPoint = mat.getPoint();
				if (mat.getUser().getId() == user.getId()) {
					continue;
				}
				
				if (user.getPoints() - 100 < opponentPoint && opponentPoint <= user.getPoints() + 100) {
					System.out.println("최고의 매칭");
					Integer createMatchingNumber = createMatchingNumber();
					mat.setMatchingNumber(createMatchingNumber);
					mat.setIsMatching(2);
					matching.setMatchingNumber(createMatchingNumber);
					matching.setGameData(null);
					matching.setResult(false);
					matching.setIsMatching(0);
					matchingRepository.save(mat);
					matchingRepository.save(matching);
					
					return makeMatchingResponseDto(mat.getUser().getNickname());
				}
			}
			
			for (Matching mat : matchings) {
				Integer opponentPoint = mat.getPoint();
				if (mat.getUser().getId() == user.getId()) {
					continue;
				}
				
				if (user.getPoints() - 500 < opponentPoint && opponentPoint <= user.getPoints() + 500) {
					System.out.println("차선의 매칭");
					Integer createMatchingNumber = createMatchingNumber();
					mat.setMatchingNumber(createMatchingNumber);
					mat.setIsMatching(2);
					matching.setMatchingNumber(createMatchingNumber);
					matching.setIsMatching(0);
					matching.setGameData(null);
					matching.setResult(false);
					matchingRepository.save(mat);
					matchingRepository.save(matching);
					
					return makeMatchingResponseDto(mat.getUser().getNickname());
				}
			}
			
			for (Matching mat : matchings) {
				Integer opponentPoint = mat.getPoint();
				if (mat.getUser().getId() == user.getId()) {
					continue;
				}
				
					System.out.println("아쉬운 매칭");
					Integer createMatchingNumber = createMatchingNumber();
					mat.setMatchingNumber(createMatchingNumber);
					mat.setIsMatching(2);
					matching.setMatchingNumber(createMatchingNumber);
					matching.setIsMatching(0);
					matching.setGameData(null);
					matching.setResult(false);
					matchingRepository.save(mat);
					matchingRepository.save(matching);
					
					return makeMatchingResponseDto(mat.getUser().getNickname());
			}
			
		}
		return null;
	}
		
	public MatchingResultResponseDto cancelMatching(MatchingRequestDto matchingRequestDto) {
		User user = userRepository.findByNickname(matchingRequestDto.getNickname());
		Matching matching = matchingRepository.findByUserId(user.getId());
		if (matching != null) {System.out.println(matching.getId() +"     " + matching.getIsMatching());}
		if (matching == null) {
			return null;
		} else if (matching.getIsMatching() == 0) {
			return null;
		} else {
			matching.setIsMatching(0);
			matchingRepository.save(matching);
			return new MatchingResultResponseDto("매칭 취소 " + matchingRequestDto.getNickname());
		}
	}
	
	private Integer createMatchingNumber() {
		Random random = new Random();
		
		while (true) {
			Integer pin = random.nextInt(89999999) + 10000000;
			if (matchingRepository.findByMatchingNumber(pin) == null) {
				return pin;
			} else {
				continue;
			}
		}
	}
	
	private MatchingResponseDto makeMatchingResponseDto(String nickname) {
		User user = userRepository.findByNickname(nickname);
		
		MatchingResponseDto matchingResponseDto = new MatchingResponseDto();
		
		WinRate winrate = new WinRate(10, 7, 3);
		List<WinRate> record = new ArrayList<>(List.of(winrate));
		Integer average = 163;
		
		return matchingResponseDto.builder()
				.username(user.getUsername())
				.nickname(user.getNickname())
				.profile(null)
				.point(user.getPoints())
				.rank(50)
				.record(record)
				.average(average)
				.randomNumber(matchingRepository.findByUserId(user.getId()).getMatchingNumber())
				.build();
	}
	
	public GamingResponseDto gaming(String myNickname, GamingRequestDto gamingRequestDto) {
		// gamingRequestDto : 상대방 닉네임과 내정보
		System.out.println("정보 입력 요청이 왔습니다" + myNickname);
		User user = userRepository.findByNickname(myNickname);
		User opponent = userRepository.findByNickname(gamingRequestDto.getOpponentNickname());
		
		Matching myMatching = matchingRepository.findByUserId(user.getId());
		Matching opponentMatching = matchingRepository.findByUserId(opponent.getId());
		
		myMatching.setGameData(gamingRequestDto.getMyGameData());
		matchingRepository.save(myMatching);
		
		return new GamingResponseDto(opponentMatching.getGameData());
	}
}