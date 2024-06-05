package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientVitalInfoVO {

    // vital 식별자
    private Long patientVitalId;
    // AdmissionInfo의 입원 식별자
    private String admissionId;
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
    // 등록 일자
    private Timestamp patientVitalCreatedAt;
}
