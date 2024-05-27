package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientInfoVO {

    // 환자 식별자
    private String ptntId;
    // 환자 이름
    private String ptntName;
    // 성별
    private String sex;
    // 생년월일
    private java.sql.Date birthdate;
    // 과거 병력
    private String diseaseHistory;
    // 담당 의사
    private String staffId;
}
