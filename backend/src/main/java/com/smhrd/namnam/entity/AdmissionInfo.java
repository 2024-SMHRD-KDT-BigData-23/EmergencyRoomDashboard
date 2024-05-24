package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "admission_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdmissionInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admission_id")
    private Long hoptId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "ptnt_id", nullable = false)
    private PatientInfo patientInfo;

    @Column(name = "admission_state", nullable = false, length = 10)
    private String admissionState;

    @Column(name = "in_time", nullable = false)
    private Timestamp inTime;

    @Column(name = "out_time")
    private Timestamp outTime;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

}
