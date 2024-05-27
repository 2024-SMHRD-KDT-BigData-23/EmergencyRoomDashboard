package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "Map_info")
@AllArgsConstructor
@NoArgsConstructor
public class MapInfo {

    // -- 병상에 어떤 환자가 입원해있는지에 대한 정보 --

    // 위치 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "map_id")
    private Long mapId;

    // BedInfo의 병상 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "bed_id", nullable = false)
    private BedInfo bedInfo;

    // 등록 날짜
    @UpdateTimestamp
    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    // AdmissionInfo의 입원 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "admission_id", nullable = false)
    private AdmissionInfo admissionInfo;

}
