package com.smhrd.namnam.vo;

import com.smhrd.namnam.entity.StaffInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserActivityVO {

    // 활동 식별자
    private Long id;

    // 의료진 식별자
    private StaffInfo staffInfo;

    // 활동 날짜
    private LocalDateTime activityDate;

    // 활동 종류
    private String activityType;  // "login" 또는 "logout"
}
