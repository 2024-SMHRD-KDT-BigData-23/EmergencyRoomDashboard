package com.smhrd.namnam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "admission_list_view")
@AllArgsConstructor
@NoArgsConstructor
@Immutable
public class AdmissionListView {

    // 뷰의 식별자
    @Id
    @Column(name = "id")
    private Long id;

    // 입원 식별자
    @Column(name = "admission_id")
    private String admissionId;

    // 등록 일자
    @Column(name = "admission_created_at")
    private Timestamp admissionCreatedAt;

    // 도착 시간
    @Column(name = "admission_in_time")
    private Timestamp admissionInTime;

    // 퇴원 시간
    @Column(name = "admission_out_time")
    private Timestamp admissionOutTime;

    // 입원 여부
    @Column(name = "admission_state")
    private String admissionState;

    // 실제 배치 결과
    @Column(name = "admission_result_ward")
    private String admissionResultWard;

    // 환자 이름
    @Column(name = "patient_name")
    private String patientName;

    // 성별
    @Column(name = "patient_sex")
    private String patientSex;

    // 생년월일
    @Column(name = "patient_birthdate")
    private java.sql.Date patientBirthdate;

    // 과거 병력
    @Column(name = "patient_disease_history")
    private String patientDiseaseHistory;

    // 구역
    @Column(name = "bed_ward")
    private String bedWard;

    // 등록 일자
    @Column(name = "patient_vital_created_at")
    private Timestamp patientVitalCreatedAt;

    // 체온
    @Column(name = "patient_vital_temperature")
    private BigDecimal patientVitalTemperature;

    // 심박수
    @Column(name = "patient_vital_hr")
    private Integer patientVitalHr;

    // 호흡수
    @Column(name = "patient_vital_respiratory_rate")
    private Integer patientVitalRespiratoryRate;

    // 산소포화도
    @Column(name = "patient_vital_spo2")
    private BigDecimal patientVitalSpo2;

    // 수축혈압
    @Column(name = "patient_vital_nibp_s")
    private Integer patientVitalNibpS;

    // 이완혈압
    @Column(name = "patient_vital_nibp_d")
    private Integer patientVitalNibpD;

    // 통증수준
    @Column(name = "patient_vital_pain")
    private Integer patientVitalPain;

    // 주요증상
    @Column(name = "patient_vital_chief_complaint")
    private String patientVitalChiefComplaint;

    // mimic데이터의 acuity컬럼 값
    @Column(name = "patient_vital_acuity")
    private Integer patientVitalAcuity;

    // 위험도
    @Column(name = "deep_ncdss")
    private String deepNcdss;
}