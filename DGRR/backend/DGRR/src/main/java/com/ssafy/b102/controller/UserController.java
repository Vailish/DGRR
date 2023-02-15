package com.ssafy.b102.controller;

import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.b102.request.dto.CheckPasswordInfoDto;
import com.ssafy.b102.request.dto.IdentifierRequestDto;
import com.ssafy.b102.request.dto.LoginRequestDto;
import com.ssafy.b102.request.dto.RequestUsernameDto;
import com.ssafy.b102.request.dto.SetPasswordDto;
import com.ssafy.b102.request.dto.UserRequestDto;
import com.ssafy.b102.request.dto.UserUpdateRequestDTO;
import com.ssafy.b102.response.dto.IdentifierResponseDto;
import com.ssafy.b102.response.dto.UserResponseDto;
import com.ssafy.b102.response.dto.UserUpdateResponseDto;
import com.ssafy.b102.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
	@Autowired
	public UserService userService;
	
	@PostMapping("/identifier")
	public ResponseEntity<?> identifier(@RequestBody IdentifierRequestDto identifierRequestDto){
			IdentifierResponseDto identifierResponseDto = userService.identifier(identifierRequestDto);
			return new ResponseEntity<IdentifierResponseDto>(identifierResponseDto, HttpStatus.OK);
	}
	
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
	
	@GetMapping("/check/username/{username}")
	public ResponseEntity<?> checkUsername(@PathVariable String username){
		String response = userService.checkUsername(username);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@GetMapping("/check/nickname/{nickname}")
	public ResponseEntity<?> checkNickname(@PathVariable String nickname){
		String response = userService.checkNickname(nickname);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@GetMapping("/check/email/{email}")
	public ResponseEntity<?> checkEmail(@PathVariable String email){
		String response = userService.checkEmail(email);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@PostMapping("/request/username")
	public ResponseEntity<?> requestUsername(@RequestBody RequestUsernameDto requestUsernameDto){
			String response = userService.requestUsername(requestUsernameDto);
			return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@PostMapping("/request/setpassword")
	public ResponseEntity<?> checkInfo(@RequestBody CheckPasswordInfoDto checkPasswordInfoDto){
		Boolean response = userService.checkInfo(checkPasswordInfoDto);
		return new ResponseEntity<Boolean>(response, HttpStatus.OK);
	}
	
	@PutMapping("/request/setpassword")
	public ResponseEntity<?> setPassword(@RequestBody SetPasswordDto setPasswordDto){
		Boolean response = userService.setPassword(setPasswordDto);
		return new ResponseEntity<Boolean>(response, HttpStatus.OK);
	}
	
	@PostMapping("/request/pin")
	public ResponseEntity<?> createPin(@RequestBody LoginRequestDto loginRequestDto){
		String response = userService.createPin(loginRequestDto);
		return new ResponseEntity<String>(response, HttpStatus.OK);
}
	
	// 이미지 정보 확인
	
	@Value("${file.dir}")
	private String fileDir;
	
//	@GetMapping("/{date}/{savedName}")
//    public ResponseEntity<?> showImage(@PathVariable String savedName, @PathVariable String date) throws IOException {
//        Pattern pattern = Pattern.compile("\\.\\.");
//        if (pattern.matcher(date).matches() || pattern.matcher(savedName).matches()) {
//            throw new RuntimeException("상위 디렉토리로 접근은 불가능합니다.");
//        }
//        if (date.equals("default")) {
//            return new ResponseEntity<>(new UrlResource("classpath:/static/" + date + "/" + savedName), HttpStatus.OK);
//        }
//        return new ResponseEntity<>(new UrlResource("file:" + fileDir + date + "/" + savedName), HttpStatus.OK);
//    }
	
//	@PutMapping("/userimg/")
//	public ResponseEntity<?> updateUser(UserUpdateRequestDTO userUpdateRequestDTO) {
//		System.out.println(userUpdateRequestDTO);
//		UserUpdateResponseDto userUpdateResponseDto = userService.updateUser(userUpdateRequestDTO);
//		return new ResponseEntity<UserUpdateResponseDto>(userUpdateResponseDto, HttpStatus.OK);
//	}
	
	@GetMapping("/request/userimg/{nickname}")
	public ResponseEntity<?> userImg(@PathVariable String nickname) {
		String url = userService.userImg(nickname);
		return new ResponseEntity<String>(url, HttpStatus.OK);
	}
	
}
