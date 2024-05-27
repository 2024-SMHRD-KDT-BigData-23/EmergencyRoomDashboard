package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bed_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BedInfo {

    // -- 병원 내 구역별 병상 구성 정보 --

    // 병상 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bed_id")
    private Long bedId;

    // 구역
    @Column(name = "ward", nullable = false, length = 20)
    private String ward;

    // 병상 번호
    @Column(name = "bed_num", nullable = false)
    private int bedNum;

    // 위치도
    @Column(name = "bed_map", nullable = false, length = 1000)
    private String bedMap;

}