package com.ssafy.b102.response.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class GameInfoResponseDto {
	private Long game_id;
	private Boolean game_type;
	private LocalDateTime game_date;
	private List<GameDetail> game_detail;
}
