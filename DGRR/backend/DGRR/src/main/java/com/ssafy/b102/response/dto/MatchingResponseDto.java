package com.ssafy.b102.response.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MatchingResponseDto {
	private String username;
	private String nickname;
	private String profile;
	private Integer randomNumber;
	private Integer point;
	private Integer rank;
	private List<WinRate> record;
	private Integer average;
}
