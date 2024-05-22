package com.smhrd.namnam.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class Risk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Column(nullable = false)
    private Integer heartRate;  // 심박수

    @Column(nullable = false)
    private Integer respirationRate;  // 호흡수

    @Column(nullable = false)
    private Integer temperature;  // 체온

    @Column(nullable = false)
    private Integer riskScore;  // 위험도

    @Column(nullable = false)
    private String date;  // 날짜
}
