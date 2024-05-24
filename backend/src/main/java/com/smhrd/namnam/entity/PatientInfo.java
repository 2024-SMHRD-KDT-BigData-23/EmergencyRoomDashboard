package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "patient_info")
@AllArgsConstructor
@NoArgsConstructor
public class PatientInfo {

    @Id
    @Column(name = "ptnt_id", length = 30)
    private String ptntId;

    @Column(name = "ptnt_name", nullable = false, length = 50)
    private String ptntName;

    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

    @Column(name = "birthdate", nullable = false)
    private java.sql.Date birthdate;

    @Column(name = "disease_history", nullable = false, columnDefinition = "TEXT")
    private String diseaseHistory;

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private StaffInfo staffInfo;

}
