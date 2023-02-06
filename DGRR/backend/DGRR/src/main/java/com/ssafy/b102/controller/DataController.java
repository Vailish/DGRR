package com.ssafy.b102.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.b102.response.dto.DataResponseDto;
import com.ssafy.b102.response.dto.RankingResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class DataController {
	
	//dummydata
	@GetMapping("/data/points/{nickname}")
	public ResponseEntity<?> dummy(@PathVariable String nickname){
		
		DataResponseDto dataResponseDto = new DataResponseDto(100, 150, 200);
		
		return new ResponseEntity<DataResponseDto>(dataResponseDto, HttpStatus.OK); 
	}
	
	//dummydata
	@GetMapping("/data/ranking/{nickname}")
	public ResponseEntity<?> dummy2(@PathVariable String nickname){
		
		RankingResponseDto rankingResponseDto1 = new RankingResponseDto("ttest2", 8, 2200);
		RankingResponseDto rankingResponseDto2 = new RankingResponseDto("ttest3", 9, 2120);
		RankingResponseDto rankingResponseDto3 = new RankingResponseDto("ttest1", 10, 2000);
		RankingResponseDto rankingResponseDto4 = new RankingResponseDto("ttest4", 11, 1920);
		RankingResponseDto rankingResponseDto5 = new RankingResponseDto("ttest5", 12, 1880);
		
		return new ResponseEntity<List<RankingResponseDto>>(List.of(rankingResponseDto1, rankingResponseDto2, rankingResponseDto3, rankingResponseDto4, rankingResponseDto5), HttpStatus.OK); 
	}
	
}
