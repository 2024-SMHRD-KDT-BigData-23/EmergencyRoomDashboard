package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "patient_vital_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientVitalInfo {

    // -- 한개의 입원코드에 해당하는 생체 정보 --

    // vital 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vital_id")
    private Long vitalId;

    // AdmissionInfo의 입원 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "admission_id", nullable = false)
    private AdmissionInfo admissionInfo;

    // 성별
    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

    // 체온
    @Column(name = "temperature", nullable = false, precision = 4, scale = 1)
    private BigDecimal temperature;

    // 심박수
    @Column(name = "hr", nullable = false)
    private int hr;

    // 호흡수
    @Column(name = "respiratory_rate", nullable = false)
    private int respiratoryRate;

    // 산소포화도
    @Column(name = "spo2", nullable = false, precision = 4, scale = 1)
    private BigDecimal spo2;

    // 수축혈압
    @Column(name = "nibp_s", nullable = false)
    private int nibpS;

    // 이완혈압
    @Column(name = "nibp_d", nullable = false)
    private int nibpD;

    // 통증수준
    @Column(name = "pain", nullable = false)
    private int pain;

    // 주요증상
    @Column(name = "chief_complaint", nullable = false, columnDefinition = "TEXT")
    private String chiefComplaint;

    // mimic데이터의 acutiry컬럼 값
    @Column(name = "acuity", nullable = false)
    private int acuity;

    // 등록 일자
    @UpdateTimestamp
    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

}
