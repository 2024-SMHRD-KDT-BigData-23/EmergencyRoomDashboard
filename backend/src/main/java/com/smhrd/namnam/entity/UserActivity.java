package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_activity")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserActivity {

    // 활동 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 의료진 식별자
    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private StaffInfo staffInfo;

    // 활동 날짜
    @Column(name = "activity_date", nullable = false)
    private LocalDateTime activityDate;

    // 활동 종류
    @Column(name = "activity_type", nullable = false)
    private String activityType;  // "login" 또는 "logout"
}
