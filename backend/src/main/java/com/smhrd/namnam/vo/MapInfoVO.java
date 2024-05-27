package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapInfoVO {

    // 위치 식별자
    private Long mapId;
    // BedInfo의 병상 식별자
    private Long bedId;
    // 등록 날짜
    private Timestamp mapCreatedAt;
    // AdmissionInfo의 입원 식별자
    private String admisssionId;
}
