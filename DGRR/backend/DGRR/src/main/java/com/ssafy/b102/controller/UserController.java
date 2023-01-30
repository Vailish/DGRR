package com.ssafy.b102.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.b102.request.dto.UserRequestDto;
import com.ssafy.b102.response.dto.UserResponseDto;
import com.ssafy.b102.security.config.auth.PrincipalDetails;
import com.ssafy.b102.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
	@Autowired
	public UserService userService;
	
	
//	// 모든 사람이 접근 가능
//	@GetMapping("home")
//	public String home() {
//		return "<h1>home</h1>";
//	}
	
	// Tip : JWT를 사용하면 UserDetailsService를 호출하지 않기 때문에 @AuthenticationPrincipal 사용 불가능.
	// 왜냐하면 @AuthenticationPrincipal은 UserDetailsService에서 리턴될 때 만들어지기 때문이다.
	
	// 유저 혹은 매니저 혹은 어드민이 접근 가능
//	@GetMapping("user")
//	public String user(Authentication authentication) {
//		PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
//		System.out.println("principal : "+principal.getUser().getId());
//		System.out.println("principal : "+principal.getUser().getUsername());
//		System.out.println("principal : "+principal.getUser().getPassword());
//		
//		return "<h1>user</h1>";
//	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> createUser(@RequestBody UserRequestDto userRequestDto){
			UserResponseDto userResponseDto = userService.signUp(userRequestDto);
			return new ResponseEntity<UserResponseDto>(userResponseDto, HttpStatus.OK);
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUser(){
		List<UserResponseDto> userResponseDto = userService.getAllUser();
		return new ResponseEntity<List<UserResponseDto>>(userResponseDto, HttpStatus.OK);
	}
	
	@GetMapping("/user/{username}")
	public ResponseEntity<?> getUser(@PathVariable String username){
		UserResponseDto userResponseDto = userService.getUser(username);
		return new ResponseEntity<UserResponseDto>(userResponseDto, HttpStatus.OK);
	}
	
//	@PutMapping("/user/{username}")
//	public ResponseEntity<?> updateUser(@PathVariable String username){
//		UserResponseDto userResponseDto = userService.getUser(username);
//		return new ResponseEntity<UserResponseDto>(userResponseDto, HttpStatus.OK);
//	}

//	@PostMapping("/login")
//	public ResponseEntity<?> logIn(@RequestBody LoginRequestDto loginRequestDto){
//		LoginRequestDto user = userService.logIn(loginRequestDto);
//		// 토큰? 뱉어주기, 일단은 비밀번호 일치 여부만 확인
//		return new ResponseEntity<User>(user, HttpStatus.OK);
//	}

	//public ResponseEntity<ResDto> signIn(UserDto userDto) {
	//
	//ResDto rs = re
	//return ResponseEntity.status(HttpStatus.OK).body();
	
}
