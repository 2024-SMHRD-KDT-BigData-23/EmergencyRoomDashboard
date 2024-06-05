package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "deep_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeepInfo {

    // -- 딥러닝 분석 결과 정보 --

    // 분석 결과 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deep_id")
    private Long deepId;

    // Patientvital의 vital 식별자
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "patient_vital_id", nullable = false)
    private PatientVitalInfo patientVitalInfo;

    // 위험도
    @Column(name = "deep_ncdss", nullable = true)
    private String deepNcdss;

    // 위험도 확률
    @Column(name = "deep_ncdss_percent", nullable = true)
    private BigDecimal deepNcdssPercent;

    // 등록 날짜
    @UpdateTimestamp
    @Column(name = "deep_created_at", nullable = false)
    private Timestamp deepCreatedAt;

}