package com.smhrd.namnam.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hospital_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalInfo {

    // -- 병원 정보 --

    // 병원 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hosp_id")
    private Long hospId;

    // 병원명
    @Column(name = "hosp_name", nullable = false, length = 50)
    private String hospName;

    // 병원 주소
    @Column(name = "hosp_addr", nullable = false, length = 1000)
    private String hospAddr;

    // 병원 전화번호
    @Column(name = "hosp_tel", nullable = false, length = 20)
    private String hospTel;

    // 병원 병상수
    @Column(name = "hosp_bed_cnt", nullable = false)
    private int hospBedCnt;


}
