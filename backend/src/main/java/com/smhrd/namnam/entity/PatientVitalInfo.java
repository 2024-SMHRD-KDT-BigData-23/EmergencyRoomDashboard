package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "patient_vital_info")
@Data
public class PatientVitalInfo {

    @Id
    @Column(name = "stay_id", nullable = false, length = 20)
    private String stayId;

    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

    @Column(name = "temperature", nullable = false)
    private float temperature;

    @Column(name = "hr", nullable = false)
    private int hr;

    @Column(name = "respiratory_rate", nullable = false)
    private int respiratoryRate;

    @Column(name = "spo2", nullable = false)
    private float spo2;

    @Column(name = "nibp_s", nullable = false)
    private int nibpS;

    @Column(name = "nibp_d", nullable = false)
    private int nibpD;

    @Column(name = "pain", nullable = false)
    private int pain;

    @Column(name = "chief_complaint", nullable = false, length = 100)
    private String chiefComplaint;

    @ManyToOne
    @JoinColumn(name = "stay_id", referencedColumnName = "stay_id", insertable = false, updatable = false)
    private PatientInfo patientInfo;
}
