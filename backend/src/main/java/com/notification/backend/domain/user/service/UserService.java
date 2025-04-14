package com.notification.backend.domain.user.service;

import com.notification.backend.global.config.jwt.JwtTokenProvider;
import com.notification.backend.domain.user.dto.request.LoginRequestDto;
import com.notification.backend.domain.user.dto.request.SignupRequestDto;
import com.notification.backend.domain.user.dto.response.LoginResponseDto;
import com.notification.backend.domain.user.entity.Role;
import com.notification.backend.domain.user.entity.User;
import com.notification.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public void signup(SignupRequestDto dto) {
        if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디 입니다.");
        }

        User user = User.builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        userRepository.save(user);
    }

    public LoginResponseDto login(LoginRequestDto dto) {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtTokenProvider.createToken(user.getUsername(), user.getRole().name());

        return new LoginResponseDto(user.getUsername(), user.getRole().name(), token);
    }
}
