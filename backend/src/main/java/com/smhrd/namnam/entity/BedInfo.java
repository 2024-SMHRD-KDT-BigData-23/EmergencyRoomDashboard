package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bed_info")
@Data
public class BedInfo {

    @Id
    @Column(name = "stay_id", nullable = false, length = 20)
    private String stayId;

    @Column(name = "ward", nullable = false, length = 20)
    private String ward;

    @Column(name = "bed_num", nullable = false)
    private int bedNum;

    @ManyToOne
    @JoinColumn(name = "stay_id", referencedColumnName = "stay_id", insertable = false, updatable = false)
    private PatientInfo patientInfo;
}
