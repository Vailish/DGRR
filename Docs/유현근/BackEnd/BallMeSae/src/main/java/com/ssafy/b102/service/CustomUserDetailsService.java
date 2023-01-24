package com.ssafy.b102.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.persistence.model.User;

import lombok.AllArgsConstructor;


//시큐리티 설정에서 loginProcessingUrl(/login):
//login 요청이 오면 자동으로 UserDetailsService 타입으로 IOC되어있는 loadUserByUsername 함수가 실행
@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
 
	@Autowired
	private UserRepository userRepository;
 
	
	//시큐리티 session(내부 Authenticarion(내부 UserDetails))  
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) {
 
//		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
 
		User user = userRepository.findByUsername(username);
 
		if (user != null) {
//			grantedAuthorities.add(new SimpleGrantedAuthority("USER")); // USER 라는 역할을 넣어준다.
			return user;
		} else {
			throw new UsernameNotFoundException("can not find User : " + username);
		}
	}
	
}