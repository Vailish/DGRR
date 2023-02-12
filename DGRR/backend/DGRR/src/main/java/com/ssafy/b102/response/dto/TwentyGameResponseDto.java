package com.ssafy.b102.response.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TwentyGameResponseDto {
	private Integer gameNumber;
	private Integer winGame;
	private Integer loseGame;
}
