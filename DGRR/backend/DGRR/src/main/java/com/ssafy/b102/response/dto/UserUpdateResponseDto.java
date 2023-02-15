package com.ssafy.b102.response.dto;


import com.ssafy.b102.Entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Setter(AccessLevel.NONE)
@Builder
public class UserUpdateResponseDto {
    private String nickname;
    private String stateMessage;
    private FileResponseDTO profileImage;

    public static UserUpdateResponseDto toDto(User user) {
        return UserUpdateResponseDto.builder()
                .nickname(user.getNickname())
                .stateMessage(null)
                .profileImage(getImage(user))
                .build();
    }

    private static FileResponseDTO getImage(User user) {
        return FileResponseDTO.toDTO(user.getUser_img());
    }
}