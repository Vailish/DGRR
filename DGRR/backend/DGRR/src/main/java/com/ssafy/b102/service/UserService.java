package com.ssafy.b102.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.User;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.request.dto.UserRequestDto;
import com.ssafy.b102.response.dto.UserResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public UserResponseDto signUp(UserRequestDto userRequestDto) {
		userRequestDto.setPassword(bCryptPasswordEncoder.encode(userRequestDto.getPassword()));
		User user = userRequestDto.toEntity();
		user.setCreateDate(LocalDateTime.now());
		this.userRepository.save(user);
		
		return UserResponseDto.builder()
				.username(user.getUsername())
//				.age(user.getAge())
				.email(user.getEmail())
				.name(user.getName())
				.nickname(user.getNickname())
				.createDate(user.getCreateDate())
				.gender(user.getGender())
				.points(user.getPoints())
				.birthday(user.getBirthday())
				.build();
	}
	
	public UserResponseDto getUser(String username) {
		User user = userRepository.findByUsername(username);
		return UserResponseDto.builder()
				.username(user.getUsername())
//				.age(user.getAge())
				.email(user.getEmail())
				.name(user.getName())
				.nickname(user.getNickname())
				.createDate(user.getCreateDate())
				.gender(user.getGender())
				.points(user.getPoints())
				.birthday(user.getBirthday())
				.build();
	};
	
	public List<UserResponseDto> getAllUser() {
		List<UserResponseDto> userList = new ArrayList<>();
		userRepository.findAll().forEach(user ->
		 userList.add(UserResponseDto.builder()
				.username(user.getUsername())
//				.age(user.getAge())
				.email(user.getEmail())
				.createDate(user.getCreateDate())
				.gender(user.getGender())
				.points(user.getPoints())
				.birthday(user.getBirthday())
				.build()
				)
		 ); 
		return userList;
		
	};
	
}