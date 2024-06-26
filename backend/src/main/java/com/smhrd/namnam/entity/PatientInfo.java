package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "patient_info")
@Data
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

    // 나이
    @Column(name = "patient_age", nullable = false)
    private int patientAge;

    // 생년월일
    @Column(name = "patient_birthdate", nullable = false)
    private java.sql.Date patientBirthdate;

    // 과거 병력
    @Column(name = "patient_disease_history", nullable = false, columnDefinition = "TEXT")
    private String patientDiseaseHistory;

    // HospitalInfo의 병원 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "hospital_id", nullable = false)
    private HospitalInfo hospitalInfo;

}
