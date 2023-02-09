package com.ssafy.b102.response.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WinRate {
	private Integer totalGame;
	private Integer winGame;
	private Integer loseGame;
}
