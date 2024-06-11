package com.smhrd.namnam.entity;

import com.smhrd.namnam.vo.AdmissionInfoVO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "admission_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdmissionInfo {

    // -- 한 입원 코드에 대한 기본 정보 --

    // 입원 식별자
    @Id
    @Column(name = "admission_id", length = 30)
    private String admissionId;

    // 입실한 환자 정보
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientInfo patientInfo;

    // 담당 의료진
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "staff_id", nullable = false)
    private StaffInfo staffInfo;

    // 도착 시간
    @Column(name = "admission_in_time", nullable = false)
    private Timestamp admissionInTime;

    // 퇴원 시간
    @Column(name = "admission_out_time")
    private Timestamp admissionOutTime;

    // 도착수단
    @Column(name = "admission_arrival_transport", length = 20, nullable = false)
    private String admissionArrivalTransport;

    // 통증수준
    @Column(name = "admission_pain", nullable = false)
    private int admissionPain;

    // 주요증상
    @Column(name = "admission_chief_complaint", nullable = false, columnDefinition = "TEXT")
    private String admissionChiefComplaint;

    // mimic데이터의 acutiry컬럼 값
    @Column(name = "admission_acuity", nullable = false)
    private int admissionAcuity;
}
