package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalInfoVO {

    // 병원 식별자
    private Long hospitalId;
    // 병원명
    private String hospitalName;
    // 병원 주소
    private String hospitalAddr;
    // 병원 전화번호
    private String hospitalTel;
    // 병원 병상수
    private int hospitalBedCnt;
}
