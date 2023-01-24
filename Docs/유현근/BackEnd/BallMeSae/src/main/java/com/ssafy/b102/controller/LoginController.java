package com.ssafy.b102.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.ssafy.b102.model.dto.UserDto;
import com.ssafy.b102.persistence.model.User;
import com.ssafy.b102.service.UserService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class LoginController {
 
	private final UserService userService;
	
	BCryptPasswordEncoder bcryptPasswordEncoder;
	
	@GetMapping("/login")
	public String login(HttpServletRequest request) {
		
		return "login";
	}
	
	
 
 
	@GetMapping("/signUp")
	public String signUp(Model model) {
		model.addAttribute("userDto", new UserDto());
		return "signUp";
	}
	
	
	@PostMapping("/signUp")
	public String signUp(@ModelAttribute("userDto") UserDto userDto) {
		userService.insert(userDto);
		return "redirect:/login";
	}
}