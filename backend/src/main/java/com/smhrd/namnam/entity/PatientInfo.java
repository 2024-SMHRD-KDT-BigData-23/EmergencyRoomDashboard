package com.smhrd.namnam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "patient_info")
@Data
public class PatientInfo {

    @Id
    @Column(name = "stay_id", nullable = false, length = 20)
    private String stayId;

    @Column(name = "patient_id", nullable = false, length = 20)
    private String patientId;

    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "ward", length = 20)
    private String ward;

    @Column(name = "intime", nullable = false)
    private LocalDateTime intime;

    @Column(name = "outtime")
    private LocalDateTime outtime;

    @Column(name = "history", nullable = false, columnDefinition = "TEXT")
    private String history;

    @Column(name = "admission_state", nullable = false, length = 10)
    private String admissionState;


}
