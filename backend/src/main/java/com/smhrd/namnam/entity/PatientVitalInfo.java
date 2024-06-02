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
    @Column(name = "patient_vital_id")
    private Long patientVitalId;

    // AdmissionInfo의 입원 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "admission_id", nullable = false)
    private AdmissionInfo admissionInfo;

    // 체온
    @Column(name = "patient_vital_temperature", nullable = false, precision = 4, scale = 1)
    private BigDecimal patientVitalTemperature;

    // 심박수
    @Column(name = "patient_vital_hr", nullable = false)
    private int patientVitalHr;

    // 호흡수
    @Column(name = "patient_vital_respiratory_rate", nullable = false)
    private int patientVitalRespiratoryRate;

    // 산소포화도
    @Column(name = "patient_vital_spo2", nullable = false, precision = 4, scale = 1)
    private BigDecimal patientVitalSpo2;

    // 수축혈압
    @Column(name = "patient_vital_nibp_s", nullable = false)
    private int patientVitalNibpS;

    // 이완혈압
    @Column(name = "patient_vital_nibp_d", nullable = false)
    private int patientVitalNibpD;

    // 통증수준
    @Column(name = "patient_vital_pain", nullable = false)
    private int patientVitalPain;

    // 주요증상
    @Column(name = "patient_vital_chief_complaint", nullable = false, columnDefinition = "TEXT")
    private String patientVitalChiefComplaint;

    // mimic데이터의 acutiry컬럼 값
    @Column(name = "patient_vital_acuity", nullable = false)
    private int patientVitalAcuity;

    // 등록 일자
//   @UpdateTimestamp
    @Column(name = "patient_vital_created_at", nullable = false)
    private Timestamp patientVitalCreatedAt;

}
