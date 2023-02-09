package com.ssafy.b102.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class WinRateDto {
	private Integer totalGame;
	private Integer winGameNumber;
}
