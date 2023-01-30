package com.ssafy.b102.request.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
	private String username;
	private String password;
}