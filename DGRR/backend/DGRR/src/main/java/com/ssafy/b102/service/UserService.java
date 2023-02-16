package com.ssafy.b102.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.random.RandomGenerator;

import javax.transaction.Transactional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.b102.Entity.FileEntity;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.persistence.dao.FileRepository;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.request.dto.CheckPasswordInfoDto;
import com.ssafy.b102.request.dto.IdentifierRequestDto;
import com.ssafy.b102.request.dto.LoginRequestDto;
import com.ssafy.b102.request.dto.RequestUsernameDto;
import com.ssafy.b102.request.dto.SetPasswordDto;
import com.ssafy.b102.request.dto.UserRequestDto;
import com.ssafy.b102.request.dto.UserUpdateRequestDTO;
import com.ssafy.b102.response.dto.FileResponseDTO;
import com.ssafy.b102.response.dto.IdentifierResponseDto;
import com.ssafy.b102.response.dto.UserResponseDto;
import com.ssafy.b102.response.dto.UserUpdateResponseDto;
import com.ssafy.b102.util.FilesHandler;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	
	private final FileRepository fileRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	private final FilesHandler filesHandler;
	
	public IdentifierResponseDto identifier(IdentifierRequestDto identifierRequestDto) {
		return new IdentifierResponseDto(userRepository.findById(identifierRequestDto.getIdentifier()).getNickname());
	}	
	
	public UserResponseDto signUp(UserRequestDto userRequestDto) {
		userRequestDto.setPassword(bCryptPasswordEncoder.encode(userRequestDto.getPassword()));
		User user = userRequestDto.toEntity();
		user.setCreateDate(LocalDateTime.now());
		user.setPoints(800);
		int number = new Random().nextInt(6);
		
		user.setStateMessage(number);
		this.userRepository.save(user);
		
		FileEntity fileEntity = new FileEntity();
		fileEntity.setUser(user);
		fileRepository.save(fileEntity);
		
		return UserResponseDto.builder()
				.username(user.getUsername())
				.email(user.getEmail())
				.name(user.getName())
				.nickname(user.getNickname())
				.createDate(user.getCreateDate())
				.gender(user.getGender())
				.points(user.getPoints())
				.birthday(user.getBirthday())
				.points(800)
				.build();
	}
	
	public UserResponseDto getUser(String nickname) {
		User user = userRepository.findByNickname(nickname);
		return UserResponseDto.builder()
				.username(user.getUsername())
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
	
	public String checkUsername(String username) {
		User user =  userRepository.findByUsername(username);
		if (user == null) {
			return "true";
		}
		else {
			return "false";
		}
	}
	
	public String checkNickname(String nickname) {
		User user =  userRepository.findByNickname(nickname);
		if (user == null) {
			return "true";
		}
		else {
			return "false";
		}
	}
	
	public String checkEmail(String email) {
		User user =  userRepository.findByEmail(email);
		if (user == null) {
			return "true";
		}
		else {
			return "false";
		}
	}
	
	public String requestUsername(RequestUsernameDto requestUsernameDto) {
		User user = userRepository.findByNickname(requestUsernameDto.getNickname());
		if (user == null) {
			return null;
		};
		
		if (user.getEmail().equals(requestUsernameDto.getEmail())) {
			return user.getUsername().toString();
		} else {
			return null;
		}
	}
	
	//비밀번호 변경을 위해 정보확인
	public Boolean checkInfo(CheckPasswordInfoDto checkPasswordInfoDto) {
		String username = checkPasswordInfoDto.getUsername();
		User user = userRepository.findByUsername(username);
		if (user.getEmail().equals(checkPasswordInfoDto.getEmail())) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public Boolean setPassword(SetPasswordDto setPasswordDto) {
		String username = setPasswordDto.getUsername();
		User user = userRepository.findByUsername(username);
		if (user.getEmail().equals(setPasswordDto.getEmail())) {
			if (setPasswordDto.getPassword().equals(setPasswordDto.getPasswordConfirm())) {
				user.setPassword(bCryptPasswordEncoder.encode(setPasswordDto.getPassword()));
				this.userRepository.save(user);
				return true;
			} else {
				return false;
			}
		}
		else {
			return false;
		}
	}
	
	public String createPin(LoginRequestDto loginRequestDto) {
		//6자리 랜덤한 핀 생성/
		User user = userRepository.findByUsername(loginRequestDto.getUsername());
		if (user == null) {
			return "없는 username 입니다";
		}
		
		System.out.println(bCryptPasswordEncoder.matches(loginRequestDto.getPassword(), user.getPassword()));
		
		if (bCryptPasswordEncoder.matches(loginRequestDto.getPassword(), user.getPassword()) == true) {
			// 없는 핀번호 생성
			while (true) {
				Integer pinNum = pin();
				if (userRepository.findByPin(pinNum) == null);
					user.setPin(pinNum);
					user.setPinCreateTime(LocalDateTime.now());
					userRepository.save(user);
					return pinNum.toString();
			}
			
		} else {return "비밀번호가 다릅니다";}
	}
	
	@Transactional
	public UserUpdateResponseDto updateUser(UserUpdateRequestDTO userUpdateRequestDTO) {
		
		User user = userRepository.findByNickname(userUpdateRequestDTO.getNickname());
		if (user == null) {
			new RuntimeException("없는 유저, 유저 확인 바람");
		}
		if (userUpdateRequestDTO.getProfileImage() != null) {
			try {
                FileEntity profileImage = filesHandler.saveFile(userUpdateRequestDTO.getProfileImage(), user);
                user.setUser_img(profileImage);
            } catch (IOException e) {
                throw new RuntimeException("프로필 사진 등록 중에 문제가 발생했습니다.");
            }
		}
		user = userRepository.save(user);
        return UserUpdateResponseDto.builder()
        		.nickname(user.getNickname())
        		.stateMessage(null)
        		.profileImage(FileResponseDTO.toDTO(user.getUser_img())) //FileResponseDto
        		.build();
	}
	
//	public String userImg(String nickname) {
//		User user = userRepository.findByNickname(nickname);
//		if (user.getUser_img() == null) {
//			return "http://192.168.31.142:8080/default/profile_image.jpg";
////			return "https://i8b102.p.ssafy.io:8080/app/static/default/profile_image.jpg";
//			
//		}
//		LocalDateTime time = user.getUser_img().getCreatedAt();
//		String date = time.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
//		
//		return "http://192.168.31.142:8080/api/v1/" + date + "/" + user.getUser_img().getSavedName();
////		return "https://i8b102.p.ssafy.io:8080/api/v1/" + date + "/" + user.getUser_img().getSavedName();
//	}
	
	public String userImg(String nickname) {
		User user = userRepository.findByNickname(nickname);
		switch(user.getStateMessage()) {
		case 0:
			return "https://media.istockphoto.com/id/1349239413/photo/shot-of-coffee-beans-and-a-cup-of-black-coffee-on-a-wooden-table.jpg?b=1&s=170667a&w=0&k=20&c=0bVq4jWM5d6r4Klp0si4um7QjZIQkMjYLtuDU7oWUps=";
		case 1:
			return "https://i.pinimg.com/736x/0f/75/1a/0f751a58eee57a23da8ca81f7dea561e.jpg";
		case 2:
			return "https://i.pinimg.com/736x/34/da/45/34da45b12e7c5ad7e0704f2020ba5e0a.jpg";
		case 3:
			return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtzaOrp_oZ3buPO0KQk1WF5qVwrVrj_T1Ckg&usqp=CAU";
		case 4:
			return "https://media.istockphoto.com/id/478348860/photo/chocolate-cake-with-chocolate-fudge-drizzled-icing-and-chocolate-curls.jpg?b=1&s=612x612&w=0&k=20&c=fW3zC1L7YFp7ZqowxaeKyxcOd9bo9bhzX-0tBthYIcg=";
		case 5:
			return "https://cdn.pixabay.com/photo/2014/06/30/11/40/cupcakes-380178__340.jpg";
		}
		return null;
		}
	
	public Integer pin() {
		Random random = new Random();
		Integer pin = random.nextInt(899999) + 100000;
		return pin;
	}
	

}