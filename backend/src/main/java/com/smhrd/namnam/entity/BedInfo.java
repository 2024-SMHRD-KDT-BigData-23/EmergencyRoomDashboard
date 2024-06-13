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
    @Column(name = "bed_ward", nullable = false, length = 20)
    private String bedWard;

    // 병상 번호
    @Column(name = "bed_num", nullable = false)
    private int bedNum;

    // 병원 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "hospital_id", nullable = false)
    private HospitalInfo hospitalInfo;

}