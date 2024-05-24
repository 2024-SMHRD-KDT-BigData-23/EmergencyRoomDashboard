package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "patient_vital_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientVitalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vital_id")
    private Long vitalId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "hopt_id", nullable = false)
    private AdmissionInfo admissionInfo;

    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

    @Column(name = "temperature", nullable = false, precision = 4, scale = 1)
    private BigDecimal temperature;

    @Column(name = "hr", nullable = false)
    private int hr;

    @Column(name = "respiratory_rate", nullable = false)
    private int respiratoryRate;

    @Column(name = "spo2", nullable = false, precision = 4, scale = 1)
    private BigDecimal spo2;

    @Column(name = "nibp_s", nullable = false)
    private int nibpS;

    @Column(name = "nibp_d", nullable = false)
    private int nibpD;

    @Column(name = "pain", nullable = false)
    private int pain;

    @Column(name = "chief_complaint", nullable = false, columnDefinition = "TEXT")
    private String chiefComplaint;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

}
