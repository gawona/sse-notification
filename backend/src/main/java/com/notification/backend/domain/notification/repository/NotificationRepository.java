package com.notification.backend.domain.notification.repository;

import com.notification.backend.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiverIdOrderByCreatedAtDesc(String receiverId);
    Optional<Notification> findByIdAndReceiverId(Long id, String receiverId);
}
