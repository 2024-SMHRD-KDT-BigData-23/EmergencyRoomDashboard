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
    private Long vitalId;
    // AdmissionInfo의 입원 식별자
    private String admissionId;
    // 성별
    private String sex;
    // 체온
    private BigDecimal temperature;
    // 심박수
    private int hr;
    // 호흡수
    private int respiratoryRate;
    // 산소포화도
    private BigDecimal spo2;
    // 수축 혈압
    private int nibpS;
    // 이완 혈압
    private int nibpD;
    // 통증 수준
    private int pain;
    // 주요 증상
    private String chiefComplaint;
    // mimic데이터의 acutiry컬럼 값
    private int acuity;
    // 등록 일자
    private Timestamp createdAt;
}
