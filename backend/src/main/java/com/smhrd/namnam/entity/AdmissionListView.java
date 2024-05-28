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
@Table(name = "admission_list_view")
@Immutable
public class AdmissionListView {

    // 입원 식별자
    @Id
    @Column(name = "admission_id")
    private Long admissionId;

    // 생체 데이터 등록 일자
    @Column(name = "patient_vital_created_at")
    private Timestamp patientVitalCreatedAt;

    // 입원 상태
    @Column(name = "admission_state")
    private String admissionState;

    // 환자 이름
    @Column(name = "patient_name")
    private String patientName;

    // 환자 성별
    @Column(name = "patient_sex")
    private String PatientSex;

    // 구역
    @Column(name = "bed_ward")
    private String bedWard;

    // 체온
    @Column(name = "patient_vital_temperature")
    private BigDecimal patientVitalTemperature;

    // 심박수
    @Column(name = "patient_vital_hr")
    private int patientVitalHr;

    // 호흡수
    @Column(name = "patient_vital_respiratory_rate")
    private int patientVitalRespiratoryRate;

    // 산소포화도
    @Column(name = "patient_vital_spo2")
    private BigDecimal patientVitalSpo2;

    // 수축 혈압
    @Column(name = "patient_vital_nibp_s")
    private int patientVitalNibpS;

    // 이완 혈압
    @Column(name = "patient_vital_nibp_d")
    private int patientVitalNibpD;

    // 위험도
    @Column(name = "patient_vital_ncdss")
    private String patientVitalNcdss;

    // 실제 배치 결과
    @Column(name = "admission_result_ward")
    private String admissionResultWard;
}