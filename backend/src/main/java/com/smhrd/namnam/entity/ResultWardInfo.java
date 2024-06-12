package com.smhrd.namnam.entity;

import com.smhrd.namnam.vo.ResultWardInfoVO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "result_ward_info")
@AllArgsConstructor
@NoArgsConstructor
public class ResultWardInfo {

    // 실제 배치 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_ward_id")
    private Long resultWardId;

    // 실제 배치값
    @Column(name = "result_ward", length = 20, nullable = false)
    private String resultWard;

    // 배치를 수정한 시간
    @UpdateTimestamp
    @Column(name = "result_ward_updated_at", nullable = false)
    private Timestamp resultWardUpdatedAt;

    // 결정한 입실 정보
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "admission_id", nullable = false)
    private AdmissionInfo admissionInfo;

    // 결정한 의료진 정보
    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private StaffInfo staffInfo;

    public ResultWardInfo(StaffInfo byStaffId, AdmissionInfo byAdmissionId, ResultWardInfoVO vo) {
        this.staffInfo = byStaffId;
        this.admissionInfo = byAdmissionId;
        this.resultWard = vo.getResultWard();
    }
}
