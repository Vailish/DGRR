package com.ssafy.b102.response.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GameResponseDto {
	private Long gameId;
	private Boolean gameType;
	private LocalDateTime gameDate;
	private List<Games> gameDetail;
}
