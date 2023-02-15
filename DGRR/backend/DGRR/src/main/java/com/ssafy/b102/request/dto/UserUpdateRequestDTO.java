package com.ssafy.b102.request.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UserUpdateRequestDTO {
	private String nickname;
	private String stateMessage;
	private MultipartFile profileImage;
}
