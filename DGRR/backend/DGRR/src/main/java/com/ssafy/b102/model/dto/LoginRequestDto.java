package com.ssafy.b102.model.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
	private String username;
	private String password;
}