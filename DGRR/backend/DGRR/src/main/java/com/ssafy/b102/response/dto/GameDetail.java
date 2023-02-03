package com.ssafy.b102.response.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GameDetail {
	private String nickname;
	private List<Integer> game_score;
	private Integer game_rank;
}
