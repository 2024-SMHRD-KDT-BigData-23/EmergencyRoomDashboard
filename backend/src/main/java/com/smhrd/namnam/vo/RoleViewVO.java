package com.smhrd.namnam.vo;


import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleViewVO {

    // 뷰 식별자
    private Long roleViewId;

    // 병원 식별자
    private Long hospitalId;

    // 유저 생성 시간
    private Timestamp staffCreatedAt;

    // 로그인 권한;
    private String staffAuthority;

    // 유저 아이디
    private String staffId;

    // 유저 이름
    private String staffName;

    // 유저 직위
    private String staffRole;

    // 활동 상태
    private String staffStatus;

    // 유저 비밀번호
    private String staffPw;


    // 마지막 로그인 날짜
    private Timestamp activityDate;
}
