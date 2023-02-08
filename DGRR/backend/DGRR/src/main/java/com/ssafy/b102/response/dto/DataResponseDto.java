package com.ssafy.b102.response.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class DataResponseDto {
	private Integer lastestGameTotalScore;
	private Integer Last3GameAverageTotalScore;
	private Integer HighestTotalScore;
}
