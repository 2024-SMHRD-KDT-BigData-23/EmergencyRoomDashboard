package com.smhrd.namnam.entity;


import lombok.Data;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String code;  // 환자 코드

    @Column(nullable = false)
    private String region;  // 구역

    @Column(nullable = false)
    private String sex;  // 성별

    @Column(nullable = false)
    private String name;  // 이름

    @Column(nullable = false)
    private Integer age;  // 나이

    @Column(nullable = false)
    private String admissionTime;  // 병원도착시간

    @Column(nullable = false)
    private String admissionDate;  // 입원일

    @Column(nullable = false)
    private String dischargeDate;  // 퇴원예정일


    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Risk> risks;  // 위험도 정보

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<BedAssignment> bedAssignments;  // 병상 배정 정보
}
