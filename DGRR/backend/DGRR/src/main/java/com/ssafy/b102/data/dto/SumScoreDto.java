package com.ssafy.b102.data.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SumScoreDto {
	private List<Integer> sumDetail;
	private Integer totalNum;
}
