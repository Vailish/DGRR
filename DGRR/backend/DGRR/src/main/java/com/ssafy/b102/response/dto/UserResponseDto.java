package com.ssafy.b102.response.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class UserResponseDto {
	private String username;
	private String name;
	private String nickname;
	private String email;
	private LocalDateTime createDate;
	private String gender;
	private Integer points;
	private LocalDate birthday;
}
