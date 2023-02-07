package com.ssafy.b102.response.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class DataResponseDto {
	private Integer lastest_game_total_score;
	private Integer Last_3_game_average_total_score;
	private Integer Highest_total_score;
}
