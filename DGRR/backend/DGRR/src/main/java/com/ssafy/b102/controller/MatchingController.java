package com.ssafy.b102.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.b102.request.dto.MatchingRequestDto;
import com.ssafy.b102.response.dto.MatchingJoinResponseDto;
import com.ssafy.b102.service.MatchingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class MatchingController {
	@Autowired
	public MatchingService matchingService;
	
	@PostMapping("/game/matching/")
	public ResponseEntity<?> MatchingGame(@RequestBody MatchingRequestDto matchingRequestDto) {
		MatchingJoinResponseDto matchingJoinResponseDto = matchingService.joiningMatchingGame(matchingRequestDto);
		return new ResponseEntity<MatchingJoinResponseDto>(matchingJoinResponseDto, HttpStatus.OK);
	}
}