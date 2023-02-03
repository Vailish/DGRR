package com.ssafy.b102.request.dto;


import java.util.List;

import com.mysql.cj.xdevapi.JsonArray;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GameData {
	private String nickname;
	private List<Integer> score;
}
