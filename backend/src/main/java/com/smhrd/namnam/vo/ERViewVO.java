package com.smhrd.namnam.vo;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ERViewVO {

    // 뷰의 식별자
    private Long viewId;

    // 환자 식별자
    private String patientId;

    // 환자 이름
    private String patientName;

    // 성별
    private String patientSex;

    // 생년월일
    private java.sql.Date patientBirthdate;

    // 나이
    private int patientAge;

    // 과거 병력
    private String patientDiseaseHistory;

    // 구역
    private String bedWard;

    // 입원 식별자
    private String admissionId;

    // 도착 시간
    private Timestamp admissionInTime;

    // 퇴원 시간
    private Timestamp admissionOutTime;

    // 통증수준
    private int admissionPain;

    // 주요증상
    private String admissionChiefComplaint;

    // mimic데이터의 acuity컬럼 값
    private int admissionAcuity;

    // 담당 의료진
    private String staffId;

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

    // 위험도
    private String deepNcdss;

    // home 확률
    private BigDecimal deepHomePercent;

    // icu 확률
    private BigDecimal deepIcuPercent;

    // ward 확률
    private BigDecimal deepWardPercent;

    // resultWard
    private String resultWard;

    // 도착수단
    private String admissionArrivalTransport;


}
