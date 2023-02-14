package com.ssafy.b102.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
import com.ssafy.b102.response.dto.IdentifierResponseDto;
import com.ssafy.b102.response.dto.ProfileImgResponseDto;
import com.ssafy.b102.response.dto.UserResponseDto;
import com.ssafy.b102.util.FilesHandler;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	
	private final FileRepository fileRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public IdentifierResponseDto identifier(IdentifierRequestDto identifierRequestDto) {
		return new IdentifierResponseDto(userRepository.findById(identifierRequestDto.getIdentifier()).getNickname());
	}	
	
	public UserResponseDto signUp(UserRequestDto userRequestDto) {
		System.out.println("회원가입 실행.");
		userRequestDto.setPassword(bCryptPasswordEncoder.encode(userRequestDto.getPassword()));
		User user = userRequestDto.toEntity();
		user.setCreateDate(LocalDateTime.now());
		user.setPoints(800);
		this.userRepository.save(user);
		
		FileEntity fileEntity = new FileEntity();
		fileEntity.setUser(user);
		fileRepository.save(fileEntity);
		
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
				.points(800)
				.build();
	}
	
	public UserResponseDto getUser(String nickname) {
		System.out.println("특정유저 조회 실행.");
		User user = userRepository.findByNickname(nickname);
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
		System.out.println("모든 유저 정보 조회 실행.");
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
	
	public String checkUsername(String username) {
		System.out.println("username 중복 확인.");
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
		System.out.println("nickname중복 확인.");
		if (user == null) {
			return "true";
		}
		else {
			return "false";
		}
	}
	
	public String checkEmail(String email) {
		User user =  userRepository.findByEmail(email);
		System.out.println("email 중복 확인.");
		if (user == null) {
			return "true";
		}
		else {
			return "false";
		}
	}
	
	public String requestUsername(RequestUsernameDto requestUsernameDto) {
		User user = userRepository.findByNickname(requestUsernameDto.getNickname());
		System.out.println("username찾기 실행.");
		if (user == null) {
			return requestUsernameDto.getNickname() + " 은 존재하지 않는 nickname 입니다.";
		};
		
		if (user.getEmail().equals(requestUsernameDto.getEmail())) {
			return user.getUsername().toString();
		} else {
			return requestUsernameDto.getNickname() + "\n" + requestUsernameDto.getEmail() + "\n" + "아이디와 이메일이 다릅니다 확인해주세요";
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
				System.out.println("비밀번호 변경 실행.");
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
				System.out.println("핀 번호 재생성");
				if (userRepository.findByPin(pinNum) == null);
					user.setPin(pinNum);
					user.setPinCreateTime(LocalDateTime.now());
					userRepository.save(user);
					return pinNum.toString();
			}
			
		} else {return "비밀번호가 다릅니다";}
	}
	
	@Transactional
	public ProfileImgResponseDto updateUser(UserUpdateRequestDTO userUpdateRequestDTO) {
		User user = userRepository.findByNickname(userUpdateRequestDTO.getNickname());
		if (user == null) {
			new RuntimeException("없는 유저, 유저 확인 바람");
		}
		if (userUpdateRequestDTO.getProfileImage() != null) {
			try {
                FileEntity profileImage = FilesHandler.saveFile(userUpdateRequestDTO.getProfileImage());
                user.setProfileImage(profileImage);
            } catch (IOException e) {
                throw new RuntimeException("프로필 사진 등록 중에 문제가 발생했습니다.");
            }
		}
		user = userRepository.saveAndFlush(user);
        return ProfileImgResponseDto.toDto(user);
	}
	
	public Integer pin() {
		Random random = new Random();
		Integer pin = random.nextInt(899999) + 100000;
		return pin;
	}
}