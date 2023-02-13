package com.ssafy.b102.request.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GameRequestDto {
	
	private String nickname;
	
	private Boolean gameType;
	
	private List<GameData> gameData;
	
}
