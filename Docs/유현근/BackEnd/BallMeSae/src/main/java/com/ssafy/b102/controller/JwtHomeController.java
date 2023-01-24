package com.ssafy.b102.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtHomeController {

	@GetMapping("jwthome")
	public String jwthome() {
		return "<h1>home<h1>";
	}
}
