package com.ssafy.b102.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.b102.data.dto.MyRankingDto;
import com.ssafy.b102.data.dto.TotalRankingDto;
import com.ssafy.b102.response.dto.DataResponseDto;
import com.ssafy.b102.response.dto.GraphData;
import com.ssafy.b102.response.dto.RankingResponseDto;
import com.ssafy.b102.response.dto.TwentyGameResponseDto;
import com.ssafy.b102.service.DataService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class DataController {
	@Autowired
	public DataService dataService;

	
	@GetMapping("/data/graphdata/{nickname}")
	public ResponseEntity<?> getGraphData(@PathVariable String nickname){
		List<GraphData> graphDatas = dataService.getGraphData(nickname);
		return new ResponseEntity<List<GraphData>>(graphDatas, HttpStatus.OK); 
	}
	
	@GetMapping("/data/ranking")
	public ResponseEntity<?> getRanking(){
		TotalRankingDto totalRankingDto = dataService.getTotalRanking();
		return new ResponseEntity<TotalRankingDto>(totalRankingDto, HttpStatus.OK); 
	}
	
	@GetMapping("/data/ranking/page/{pageNumber}")
	public ResponseEntity<?> getRankingPage(@PathVariable Integer pageNumber){
		TotalRankingDto totalRankingDto = dataService.getTotalRankingPage(pageNumber);
		return new ResponseEntity<TotalRankingDto>(totalRankingDto, HttpStatus.OK); 
	}
	
	@GetMapping("/data/points/{nickname}")
	public ResponseEntity<?> getUserPointsRank(@PathVariable String nickname){
		DataResponseDto dataResponseDto = dataService.getUserPointsRank(nickname);
		return new ResponseEntity<DataResponseDto>(dataResponseDto, HttpStatus.OK); 
	}
	
	@GetMapping("/data/twentygame/{nickname}")
	public ResponseEntity<?> getTwentyGame(@PathVariable String nickname){
		TwentyGameResponseDto twentyGameResponseDto = dataService.getTwentyGame(nickname);
		return new ResponseEntity<TwentyGameResponseDto>(twentyGameResponseDto, HttpStatus.OK); 
	}
	
	@GetMapping("/data/ranking/user/{nickname}")
	public ResponseEntity<?> userRanking5(@PathVariable String nickname){
		List<RankingResponseDto> rankingResponseDtos = dataService.userRanking5(nickname);
		return new ResponseEntity<>(rankingResponseDtos, HttpStatus.OK); 
	}
	
	@GetMapping("/data/ranking/myranking/{nickname}")
	public ResponseEntity<?> myRanking(@PathVariable String nickname){
		MyRankingDto myRankingDto = dataService.myRank(nickname);
		return new ResponseEntity<MyRankingDto>(myRankingDto, HttpStatus.OK); 
	}
	
}
