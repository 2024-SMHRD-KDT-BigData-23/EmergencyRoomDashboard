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
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "vital_id", nullable = false)
    private PatientVitalInfo patientVitalInfo;

    // 위험도
    @Column(name = "ncdss", nullable = false)
    private String ncdss;

    // 등록 날짜
    @UpdateTimestamp
    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

}