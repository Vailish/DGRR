package com.ssafy.b102.response.dto;

import com.ssafy.b102.Entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IdentifierResponseDto {
	private String nickname;
}
