package com.ssafy.b102.request.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.ssafy.b102.Entity.Game;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GameInfoRequestDto {
	
	private String gameType;
	
	private String gameDate;

	private String user_id;
	
	public Game toEntity() {
		return Game.builder()
				.gameType(Boolean.valueOf(gameType))
				.gameDate(LocalDateTime.parse(gameDate, DateTimeFormatter.ISO_LOCAL_DATE))
				.build();
	}
}
