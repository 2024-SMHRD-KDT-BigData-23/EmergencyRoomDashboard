package com.smhrd.namnam.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class BedAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Column(nullable = false)
    private String region;  // 구역

    @Column(nullable = false)
    private String bedNumber;  // 병상 번호
}
