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
    @Column(name = "hospital_id")
    private Long hospitalId;

    // 병원명
    @Column(name = "hospital_name", nullable = false, length = 50)
    private String hospitalName;

    // 병원 주소
    @Column(name = "hospital_addr", nullable = false, length = 1000)
    private String hospitalAddr;

    // 병원 전화번호
    @Column(name = "hospital_tel", nullable = false, length = 20)
    private String hospitalTel;

    // 병원 병상수
    @Column(name = "hospital_bed_cnt", nullable = false)
    private int hospitalBedCnt;


}
