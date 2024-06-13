package com.smhrd.namnam.vo;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffInfoVO {

    // 의료진 아이디
    private String staffId;
    // 비밀번호
    private String staffPw;
    // 의료진 이름
    private String staffName;
    // 직위
    private String staffRole;
    // 의료진 상태
    private String staffStatus;
    // 로그인 권한
    private String staffAuthority;
    // 의료진 생성 날짜
    private Timestamp staffCreatedAt;
    // HospitalInfo의 병원 식별자
    private Long hospitalId;

}
