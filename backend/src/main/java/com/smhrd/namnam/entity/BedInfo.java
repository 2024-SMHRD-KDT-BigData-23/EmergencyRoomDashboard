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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bed_id")
    private Long bedId;

    @Column(name = "ward", nullable = false, length = 20)
    private String ward;

    @Column(name = "bed_num", nullable = false)
    private int bedNum;

    @Column(name = "bed_map", nullable = false, length = 1000)
    private String bedMap;

}