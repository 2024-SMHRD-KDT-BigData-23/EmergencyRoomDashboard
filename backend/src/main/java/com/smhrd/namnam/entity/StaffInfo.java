package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    // 직위
    @Column(name = "staff_role", nullable = false, length = 30)
    private String staffRole;

    // HospitalInfo의 병원 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "hospital_id", nullable = false)
    private HospitalInfo hospitalInfo;

}
