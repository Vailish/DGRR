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
public class Games2 {
	private Long gameId;
	private Boolean gameType;
	private List<Integer> score;
	private Integer rank;
	private List<OtherPlayer> otherPlayers;
}
