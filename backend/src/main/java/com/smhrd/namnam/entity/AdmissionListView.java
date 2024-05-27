package com.smhrd.namnam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "admission_details_view")
@Immutable
public class AdmissionListView {

    @Id
    @Column(name = "admission_id")
    private Long admissionId;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "admission_state")
    private String admissionState;

    @Column(name = "ptnt_name")
    private String ptntName;

    @Column(name = "sex")
    private String sex;

    @Column(name = "ward")
    private String ward;

    @Column(name = "temperature")
    private BigDecimal temperature;

    @Column(name = "hr")
    private int hr;

    @Column(name = "respiratory_rate")
    private int respiratoryRate;

    @Column(name = "spo2")
    private BigDecimal spo2;

    @Column(name = "nibp_s")
    private int nibpS;

    @Column(name = "nibp_d")
    private int nibpD;

    @Column(name = "ncdss")
    private String ncdss;

    @Column(name = "result_ward")
    private String resultWard;
}