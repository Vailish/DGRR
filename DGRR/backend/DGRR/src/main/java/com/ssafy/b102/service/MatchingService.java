package com.ssafy.b102.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.Matching;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.persistence.dao.MatchingRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.request.dto.MatchingRequestDto;
import com.ssafy.b102.response.dto.MatchingJoinResponseDto;
import com.ssafy.b102.response.dto.MatchingResultResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatchingService {
	
	public final UserRepository userRepository;
	
	public final MatchingRepository matchingRepository;
	
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
			return new MatchingJoinResponseDto("이미 대기열 참가중입니다." + matchingRequestDto.getNickname());
		}
	}
	public MatchingResultResponseDto matchingResult(MatchingRequestDto matchingRequestDto) {
		User user = userRepository.findByNickname(matchingRequestDto.getNickname());
		Matching matching = matchingRepository.findByUserId(user.getId());
//		매칭여부 확인
		if (matching == null || matching.getIsMatching() == 0) {
			return new MatchingResultResponseDto("대기열에 없습니다.");
		}
		
		if (matching.getIsMatching() == 2) {
			List<Matching> checkMatchings = matchingRepository.findAllByMatchingNumber(matching.getMatchingNumber());
			for (Matching checkMatching : checkMatchings) {
				if (checkMatching.getUser().getId() == user.getId()) {
					continue;
				}
				matching.setIsMatching(0);
				matchingRepository.save(matching);
				return new MatchingResultResponseDto(checkMatching.getUser().getNickname());
			}
		}
//		대기열 확인
		List<Matching> matchings = matchingRepository.findAllByOrderByPoint();
		if (matchings.size() < 2) {
			return new MatchingResultResponseDto("대기열 상대가 부족합니다.");
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
					matching.setIsMatching(0);
					matchingRepository.save(mat);
					matchingRepository.save(matching);
					
					return new MatchingResultResponseDto(mat.getUser().getNickname());
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
					matchingRepository.save(mat);
					matchingRepository.save(matching);
					
					return new MatchingResultResponseDto(mat.getUser().getNickname());
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
					matchingRepository.save(mat);
					matchingRepository.save(matching);
					
					return new MatchingResultResponseDto(mat.getUser().getNickname());
			}
			
		}
		return new MatchingResultResponseDto("여긴 어떻게 옴??");
	}
		
	public MatchingResultResponseDto cancelMatching(MatchingRequestDto matchingRequestDto) {
		User user = userRepository.findByNickname(matchingRequestDto.getNickname());
		Matching matching = matchingRepository.findByUserId(user.getId());
		if (matching != null) {System.out.println(matching.getId() +"     " + matching.getIsMatching());}
		if (matching == null) {
			return new MatchingResultResponseDto("대기열에 없습니다" + matchingRequestDto.getNickname());
		} else if (matching.getIsMatching() == 0) {
			return new MatchingResultResponseDto("대기열에 없습니다" + matchingRequestDto.getNickname());
		} else {
			matching.setIsMatching(0);
			matchingRepository.save(matching);
			return new MatchingResultResponseDto("매칭 취소" + matchingRequestDto.getNickname());
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
}