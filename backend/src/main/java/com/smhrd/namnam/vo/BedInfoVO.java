package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BedInfoVO {

    // 병상 식별자
    private Long bedId;
    // 구역
    private String bedWard;
    // 병상 번호
    private int bedNum;
    // 위치도
    private String bedMap;
    // 병원 식별자
    private String hospitalId;
}
