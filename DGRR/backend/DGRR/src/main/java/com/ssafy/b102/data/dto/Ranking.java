package com.ssafy.b102.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ranking {
	private String nickname;
	private Integer ranking;
	private Integer point;
	private Integer totalGameNumber;
	private Integer winGameNumber;
	private Integer LossesGameNumber;
}
