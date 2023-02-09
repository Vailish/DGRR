package com.ssafy.b102.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.Matching;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.persistence.dao.MatchingRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.request.dto.MatchingRequestDto;
import com.ssafy.b102.response.dto.MatchingJoinResponseDto;
import com.ssafy.b102.response.dto.MatchingResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatchingService {
	
	public final UserRepository userRepository;
	
	public final MatchingRepository matchingRepository;
	
	public MatchingJoinResponseDto joiningMatchingGame(MatchingRequestDto matchingRequestDto) {
		User user = userRepository.findByNickname(matchingRequestDto.getNickname());
		Matching matching = matchingRepository.findByUserId(user.getId());
		if (matching == null) {
			matching.builder()
			.userId(user.getId())
			.point(user.getPoints())
			.joinTime(LocalDateTime.now())
			.build();
			return new MatchingJoinResponseDto();
		} else {
			return null;
		}
	}
}
