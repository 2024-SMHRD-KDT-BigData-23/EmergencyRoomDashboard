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

    // 뷰의 식별자
    private Long id;

    // 입원 식별자
    private String admissionId;

    // 등록 일자
    private Timestamp admissionCreatedAt;

    // 도착 시간
    private Timestamp admissionInTime;

    // 퇴원 시간
    private Timestamp admissionOutTime;

    // 입원 여부
    private String admissionState;

    // 실제 배치 결과
    private String admissionResultWard;

    // 환자 이름
    private String patientName;

    // 성별
    private String patientSex;

    // 생년월일
    private java.sql.Date patientBirthdate;

    // 과거 병력
    private String patientDiseaseHistory;

    // 구역
    private String bedWard;

    // 등록 일자
    private Timestamp patientVitalCreatedAt;

    // 체온
    private BigDecimal patientVitalTemperature;

    // 심박수
    private int patientVitalHr;

    // 호흡수
    private int patientVitalRespiratoryRate;

    // 산소포화도
    private BigDecimal patientVitalSpo2;

    // 수축혈압
    private int patientVitalNibpS;

    // 이완혈압
    private int patientVitalNibpD;

    // 통증수준
    private int patientVitalPain;

    // 주요증상
    private String patientVitalChiefComplaint;

    // mimic데이터의 acuity컬럼 값
    private int patientVitalAcuity;

    // 위험도
    private String deepNcdss;
}
