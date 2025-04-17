package com.notification.backend.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseDto {
    private String username;
    private String role;
    private String accessToken;
    private String refreshToken;
}
