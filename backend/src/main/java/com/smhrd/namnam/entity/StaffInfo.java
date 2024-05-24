package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "staff_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffInfo {

    @Id
    @Column(name = "staff_id", length = 30)
    private String staffId;

    @Column(name = "staff_pw", nullable = false, length = 255)
    private String staffPw;

    @Column(name = "staff_role", nullable = false, length = 30)
    private String staffRole;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "hospital_id", nullable = false)
    private HospitalInfo hospitalInfo;

}
