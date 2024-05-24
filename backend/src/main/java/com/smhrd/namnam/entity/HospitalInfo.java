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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hosp_id")
    private Long hospId;

    @Column(name = "hosp_name", nullable = false, length = 50)
    private String hospName;

    @Column(name = "hosp_addr", nullable = false, length = 1000)
    private String hospAddr;

    @Column(name = "hosp_tel", nullable = false, length = 20)
    private String hospTel;

    @Column(name = "hosp_bed_cnt", nullable = false)
    private int hospBedCnt;


}
