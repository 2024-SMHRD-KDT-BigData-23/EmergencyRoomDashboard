package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenerationTime;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "deep_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeepInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deep_id")
    private Long deepId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "vital_id", nullable = false)
    private PatientVitalInfo patientVitalInfo;

    @Column(name = "ktas", nullable = false, precision = 4, scale = 1)
    private BigDecimal ktas;

    @Column(name = "deep_result", nullable = false, columnDefinition = "TEXT")
    private String deepResult;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

}