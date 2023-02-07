package com.ssafy.b102.request.dto;

import lombok.Data;

@Data
public class SetPasswordDto {
	private String username;
	private String email;
	private String password;
	private String passwordConfirm;
}
