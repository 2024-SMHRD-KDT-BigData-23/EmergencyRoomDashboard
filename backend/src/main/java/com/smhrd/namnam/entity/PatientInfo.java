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
    @Column(name = "patient_id", length = 30)
    private String patientId;

    // 환자 이름
    @Column(name = "patient_name", nullable = false, length = 50)
    private String patientName;

    // 성별
    @Column(name = "patient_sex", nullable = false, length = 10)
    private String patientSex;

    // 생년월일
    @Column(name = "patient_birthdate", nullable = false)
    private java.sql.Date patientBirthdate;

    // 과거 병력
    @Column(name = "patient_disease_history", nullable = false, columnDefinition = "TEXT")
    private String patientDiseaseHistory;

    // 담당 의사
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "staff_id", nullable = false)
    private StaffInfo staffInfo;

}
