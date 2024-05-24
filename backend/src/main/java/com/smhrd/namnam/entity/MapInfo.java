package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "location_info")
@AllArgsConstructor
@NoArgsConstructor
public class MapInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "map_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bed_id", nullable = false)
    private BedInfo bedInfo;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "hopt_id", nullable = false)
    private AdmissionInfo admissionInfo;

}
