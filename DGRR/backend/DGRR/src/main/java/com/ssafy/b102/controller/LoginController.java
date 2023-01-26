package com.ssafy.b102.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import com.ssafy.b102.model.dto.ResDto;
import com.ssafy.b102.model.dto.UserDto;
import com.ssafy.b102.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class LoginController {

	private final UserService userService;

	BCryptPasswordEncoder bcryptPasswordEncoder;

//	@PostMapping("/login")
//	public ResponseEntity<ResDto> signIn(UserDto userDto) {
//		
//		ResDto rs = re
//		return ResponseEntity.status(HttpStatus.OK).body();
//	}

	@GetMapping("/signUp")
	public String signUp(Model model) {
		model.addAttribute("userDto", new UserDto());
		return "signUp";
	}

	@PostMapping("/signUp")
	public String signUp(@RequestBody UserDto userDto) {
		System.out.println(userDto.getPassword());
		userService.signUp(userDto);
		return "redirect:/login";
	}
}