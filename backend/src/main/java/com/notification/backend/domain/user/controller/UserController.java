package com.notification.backend.domain.user.controller;

import com.notification.backend.domain.user.dto.request.LoginRequestDto;
import com.notification.backend.domain.user.dto.request.SignupRequestDto;
import com.notification.backend.domain.user.service.UserService;
import com.notification.backend.global.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<?>> signup(@RequestBody SignupRequestDto dto) {
        userService.signup(dto);
        return ResponseEntity.ok(ApiResponse.success(null, "회원가입 성공"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok(ApiResponse.success(userService.login(dto), "로그인 성공"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        userService.logout(token);
        return ResponseEntity.ok(ApiResponse.success(null, "로그아웃 성공"));
    }
}
