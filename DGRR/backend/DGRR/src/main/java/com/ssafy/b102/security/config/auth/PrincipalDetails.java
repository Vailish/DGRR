package com.ssafy.b102.security.config.auth;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ssafy.b102.model.dto.UserDto;

public class PrincipalDetails implements UserDetails{

	private UserDto user;

    public PrincipalDetails(UserDto user){
        this.user = user;
    }

    public UserDto getUser() {
		return user;
	}

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
    }
}