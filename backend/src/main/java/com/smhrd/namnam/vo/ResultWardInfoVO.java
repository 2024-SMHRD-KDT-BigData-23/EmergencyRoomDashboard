package com.smhrd.namnam.vo;

import com.smhrd.namnam.entity.ResultWardInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultWardInfoVO {

    // 실제 배치 식별자
    private Long resultWardId;

    // 실제 배치값
    private String resultWard;

    // 업데이트 시간
    private Timestamp resultWardUpdatedAt;

    // 결정한 입실 정보
    private String admissionId;

    // 의료진 식별자
    private String staffId;

    public ResultWardInfoVO(ResultWardInfo resultWardInfo) {
        this.resultWardId = resultWardInfo.getResultWardId();
        this.resultWard = resultWardInfo.getResultWard();
        this.resultWardUpdatedAt = resultWardInfo.getResultWardUpdatedAt();
        this.admissionId = resultWardInfo.getAdmissionInfo().getAdmissionId();
        this.staffId = resultWardInfo.getStaffInfo().getStaffId();
    }
}
