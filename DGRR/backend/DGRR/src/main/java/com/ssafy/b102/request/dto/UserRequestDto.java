package com.ssafy.b102.request.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.ssafy.b102.Entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRequestDto {
	private String username;
 
	private String password;
 
	private String name;
	
	private String email;
	
	private String age;
	
	private String gender;
	
	private String nickname;
	
	private String birthday;
	
	@Builder
	public User toEntity() {
		return User.builder()
				.username(username)
				.name(name)
				.email(email)
				.password(password)
				.age(Integer.parseInt(age))
				.gender(gender)
				.nickname(nickname)
				.birthday(LocalDate.parse(birthday, DateTimeFormatter.ISO_LOCAL_DATE))
				.build();
	}
}
