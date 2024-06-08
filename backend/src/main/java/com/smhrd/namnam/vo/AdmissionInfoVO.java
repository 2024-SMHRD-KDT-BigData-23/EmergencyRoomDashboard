package com.smhrd.namnam.vo;


import com.smhrd.namnam.entity.StaffInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdmissionInfoVO {

    // 입원 식별자
    private String admissionId;
    // PatientInfo의 환자 식별자
    private String patientId;
    // 담당 의료진
    private String staffId;
    // 도착 시간
    private Timestamp admissionInTime;
    // 퇴원 시간
    private Timestamp admissionOutTime;
    // 도착 수단
    private String admissionArrivalTransport;
    // 통증 수준
    private int admissionPain;
    // 주요 증상
    private String admissionChiefComplaint;
    // mimic데이터의 acutiry컬럼 값
    private int admissionAcuity;
    // 실제 배치 결과
    private String admissionResultWard;
    // 진단 결과
    private String admissionComment;
}
