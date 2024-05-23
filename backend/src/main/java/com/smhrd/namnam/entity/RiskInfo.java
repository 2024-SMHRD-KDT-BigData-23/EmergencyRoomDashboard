package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "risk_info")
@Data
public class RiskInfo {

    @Id
    @Column(name = "stay_id", nullable = false, length = 20)
    private String stayId;

    @Column(name = "ktas_level", nullable = false)
    private int ktasLevel;

    @ManyToOne
    @JoinColumn(name = "stay_id", referencedColumnName = "stay_id", insertable = false, updatable = false)
    private PatientInfo patientInfo;
}
