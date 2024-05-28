package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeepInfoVO {

    // 분석 결과 식별자
    private Long deepId;
    // Patientvital의 vital 식별자
    private Long patientVitalId;
    // 위험도
    private String deepNcdss;
    // 등록 날짜
    private Timestamp deepCreatedAt;
}