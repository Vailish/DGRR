package com.ssafy.b102.response.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RankingResponseDto {
	private String nickname;
	private Integer ranking;
	private Integer point;
}
