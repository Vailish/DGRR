package com.ssafy.b102.data.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class TotalRankingDto {
	private List<Ranking> rankings;
}
