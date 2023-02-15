package com.ssafy.b102.response.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class GraphData {
	private Integer totalScore;
	private LocalDateTime gameDate;
}
