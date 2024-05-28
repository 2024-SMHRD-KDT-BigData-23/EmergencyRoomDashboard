package com.smhrd.namnam.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdmissionListViewVO {

    // 입원 식별자
    private Long admissionId;

    // 생체 데이터 등록 일자
    private Timestamp patientVitalCreatedAt;

    // 입원 상태
    private String admissionState;

    // 환자 이름
    private String patientName;

    // 환자 성별
    private String PatientSex;

    // 구역
    private String bedWard;

    // 체온
    private BigDecimal patientVitalTemperature;

    // 심박수
    private int patientVitalHr;

    // 호흡수
    private int patientVitalRespiratoryRate;

    // 산소포화도
    private BigDecimal patientVitalSpo2;

    // 수축 혈압
    private int patientVitalNibpS;

    // 이완 혈압
    private int patientVitalNibpD;

    // 위험도
    private String patientVitalNcdss;

    // 실제 배치 결과
    private String admissionResultWard;
}
