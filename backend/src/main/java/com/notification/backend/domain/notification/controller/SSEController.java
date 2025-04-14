package com.notification.backend.domain.notification.controller;

import com.notification.backend.domain.notification.service.SSEEmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sse")
public class SSEController {

    private final SSEEmitterService sseEmitterService;

    @GetMapping("/subscribe")
    public SseEmitter subscribe(@AuthenticationPrincipal UserDetails userDetails) {
        String userId = userDetails.getUsername();
        System.out.println("userId: " + userId);
        System.out.println("subscribe 요청 도착");
        return sseEmitterService.createEmitter(userId);
    }
}
