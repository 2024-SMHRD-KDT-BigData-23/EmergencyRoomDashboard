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

    // PatientInfo의 환자 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientInfo patientInfo;

    // 도착 시간
    @Column(name = "admission_in_time")
    private Timestamp admissionInTime;

    // 퇴원 시간
    @Column(name = "admission_out_time")
    private Timestamp admissionOutTime;

    // 도착수단
    @Column(name = "admission_arrival_transport", length = 20)
    private String admissionArrivalTransport;

    // 실제 배치 결과
    @Column(name = "admission_result_ward", length = 20)
    private String admissionResultWard;

    @Column(name="admission_comment", columnDefinition = "TEXT")
    private String admissionComment;

    // 진단 결과
//    @Column(name = "admission_Diagnosis", columnDefinition = "TEXT")
//    private String admissionDiagnosis;
}
