package com.ssafy.b102.response.dto;

import com.ssafy.b102.Entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Setter(AccessLevel.NONE)
@Builder
public class ProfileImgResponseDto {
    private Long id;
    private String nickname;
    private String introduction;
    private FileResponseDTO profileImage;

    public static ProfileImgResponseDto toDto(User user) {
        return ProfileImgResponseDto.builder()
                .nickname(user.getName())
                .profileImage(getImage(user))
                .build();
    }

    private static FileResponseDTO getImage(User user) {
        return FileResponseDTO.toDTO(user.getUser_img());
    }
}