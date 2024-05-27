package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalInfoVO {

    // 병원 식별자
    private Long hospId;
    // 병원명
    private String hospName;
    // 병원 주소
    private String hospAddr;
    // 병원 전화번호
    private String hospTel;
    // 병원 병상수
    private int hospBedCnt;
}
