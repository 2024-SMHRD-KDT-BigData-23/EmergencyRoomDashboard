package com.smhrd.namnam.vo;


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
    // 입원 여부
    private String admissionState;
    // 도착 시간
    private Timestamp admissionInTime;
    // 퇴원 시간
    private Timestamp admissionOutTime;
    // 등록 일자
    private Timestamp admissionCreatedAt;
    // 실제 배치 결과
    private String admissionResultWard;
}
