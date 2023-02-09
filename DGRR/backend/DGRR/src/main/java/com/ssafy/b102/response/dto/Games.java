package com.ssafy.b102.response.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Games {
	private String nickname;
	private List<Integer> game_score;
	private Integer game_rank;
}
