package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "staff_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffInfo {

    // -- 의료진 정보 --

    // 의료진 아이디
    @Id
    @Column(name = "staff_id", length = 30)
    private String staffId;

    // 비밀번호
    @Column(name = "staff_pw", nullable = false, length = 255)
    private String staffPw;

    // 의료진 이름
    @Column(name = "staff_name", nullable = false, length = 30)
    private String staffName;

    // 직위
    @Column(name = "staff_role", nullable = false, length = 30)
    private String staffRole;

    // 의료진 상태
    @Column(name = "staff_status", nullable = false, length = 30)
    private String staffStatus;

    // 로그인 권한
    @Column(name = "staff_authority", nullable = false, length = 10)
    private String staffAuthority;

    // 의료진 생성 날짜
    @UpdateTimestamp
    @Column(name = "staff_created_at", nullable = false)
    private Timestamp staffCreatedAt;

    // HospitalInfo의 병원 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "hospital_id", nullable = false)
    private HospitalInfo hospitalInfo;

}
