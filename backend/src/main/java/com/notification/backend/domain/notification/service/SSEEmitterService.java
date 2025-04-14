package com.notification.backend.domain.notification.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class SSEEmitterService {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final NotificationService notificationService;
    private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public SSEEmitterService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public SseEmitter createEmitter(String userId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE); // test 환경이라 time 무한대로 설정
        emitters.put(userId, emitter);

        emitter.onCompletion(() -> {
            emitters.remove(userId);
            log.info("SSE 연결 완료: {}", userId);
        });

        emitter.onTimeout(() -> {
            emitters.remove(userId);
            log.info("SSE 연결 타임아웃: {}", userId);
        });

        try {
            emitter.send(SseEmitter.event().name("connect").data("connected"));
        } catch (Exception e) {
            emitter.completeWithError(e);
        }

        // 30s 마다 heartbeat 전송
        scheduler.scheduleAtFixedRate(() -> {
            try {
                emitter.send(SseEmitter.event().name("heartbeat").data("💓"));
            } catch (IOException e) {
                log.warn("🔥 heartbeat 전송 중 오류 발생: {}", e.getMessage());
                emitter.completeWithError(e);
                emitters.remove(userId);
                log.info("🔥 emitter 제거 완료: {}", userId);
            }
        }, 0, 30, TimeUnit.SECONDS);

        return emitter;
    }

    public void sendToAdmin(String adminId, String message) {
        notificationService.saveNotification(adminId, message);

        SseEmitter emitter = emitters.get(adminId);
        if (emitter != null) {
            try {
                emitter.send(message);
                System.out.println("알림 전송: " + message);
            } catch (IOException e) {
                emitter.completeWithError(e);
                emitters.remove(adminId);
            }
        } else {
            log.warn("알림 전송 실패 - emitter 없음: {}", adminId);
        }
    }
}
