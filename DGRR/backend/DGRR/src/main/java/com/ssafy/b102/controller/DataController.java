package com.ssafy.b102.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.b102.response.dto.DataResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class DataController {
	
	@GetMapping("/data/{nickname}")
	public ResponseEntity<?> dummy(@PathVariable String nickname){
		
		DataResponseDto dataResponseDto = new DataResponseDto(100, 150, 200);
		
		return new ResponseEntity<DataResponseDto>(dataResponseDto, HttpStatus.OK); 
	}
	
	
}
