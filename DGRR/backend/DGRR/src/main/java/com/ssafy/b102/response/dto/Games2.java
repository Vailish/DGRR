package com.ssafy.b102.response.dto;

import java.time.LocalDateTime;
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
	private LocalDateTime gameDate; 
	private List<Integer> score;
	private List<Integer> sumScore;
	private Integer rank;
	private List<OtherPlayer> otherPlayers;
}
