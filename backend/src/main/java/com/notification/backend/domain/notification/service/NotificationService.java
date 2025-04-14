package com.notification.backend.domain.notification.service;

import com.notification.backend.domain.notification.entity.Notification;
import com.notification.backend.domain.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void saveNotification(String receiverId, String message) {
        Notification notification = new Notification(receiverId, message);
        notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(String receiverId) {
        return notificationRepository.findByReceiverIdOrderByCreatedAtDesc(receiverId);
    }

    @Transactional
    public void markAsRead(String userId, Long notificationId) {
        Notification notification = notificationRepository.findByIdAndReceiverId(notificationId, userId)
                .orElseThrow(() -> new RuntimeException("알림이 존재하지 않거나 권한이 없습니다."));
        notification.markAsRead();
    }
}
