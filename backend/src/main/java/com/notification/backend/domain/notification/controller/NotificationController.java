package com.notification.backend.domain.notification.controller;

import com.notification.backend.domain.notification.entity.Notification;
import com.notification.backend.domain.notification.service.NotificationService;
import com.notification.backend.domain.notification.service.SSEEmitterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notify")
@SecurityRequirement(name = "bearerAuth")
public class NotificationController {

    private final SSEEmitterService sseEmitterService;
    private final NotificationService notificationService;

    @GetMapping("/toadmin")
    public ResponseEntity<String> notifyToAdmin(
        @RequestParam String adminId,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        String sendUserId = userDetails.getUsername();
        String message = "USER (" + sendUserId + ")에게서 알림이 왔습니다.";
        sseEmitterService.sendToAdmin(adminId, message);
        return ResponseEntity.ok("알림 전송 완료");
    }

    @Operation(summary = "알림 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<List<Notification>> getNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        String userId = userDetails.getUsername();
        List<Notification> notifications = notificationService.getUserNotifications(userId);
        return ResponseEntity.ok(notifications);
    }

    @Operation(summary = "알림 읽음 처리")
    @PatchMapping("/read/{id}")
    public ResponseEntity<String> readNotification(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        notificationService.markAsRead(userDetails.getUsername(), id);
        return ResponseEntity.ok("알림 읽음 처리 완료");
    }
}
