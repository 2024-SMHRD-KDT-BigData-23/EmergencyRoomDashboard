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
    // 도착 시간
    private Timestamp admissionInTime;
    // 퇴원 시간
    private Timestamp admissionOutTime;
    // 실제 배치 결과
    private String admissionResultWard;
}
