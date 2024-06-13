package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientInfoVO {

    // 환자 식별자
    private String patientId;
    // 환자 이름
    private String patientName;
    // 성별
    private String patientSex;
    // 나이
    private int patientAge;
    // 생년월일
    private java.sql.Date patientBirthdate;
    // 과거 병력
    private String patientDiseaseHistory;
    // 담당 의사
    private String staffId;
}
