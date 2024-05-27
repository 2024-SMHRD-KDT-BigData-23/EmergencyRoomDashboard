package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "patient_info")
@AllArgsConstructor
@NoArgsConstructor
public class PatientInfo {

    // -- 환자의 기본정보 --

    // 환자 식별자
    @Id
    @Column(name = "ptnt_id", length = 30)
    private String ptntId;

    // 환자 이름
    @Column(name = "ptnt_name", nullable = false, length = 50)
    private String ptntName;

    // 성별
    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

    // 생년월일
    @Column(name = "birthdate", nullable = false)
    private java.sql.Date birthdate;

    // 과거 병력
    @Column(name = "disease_history", nullable = false, columnDefinition = "TEXT")
    private String diseaseHistory;

    // 담당 의사
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "staff_id", nullable = false)
    private StaffInfo staffInfo;

}
