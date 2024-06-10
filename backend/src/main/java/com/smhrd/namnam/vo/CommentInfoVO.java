package com.smhrd.namnam.vo;

import com.smhrd.namnam.entity.CommentInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentInfoVO {

    // comment 식별자
    private Long commentId;

    // comment를 작성한 입실 코드
    private String admissionId;

    // comment
    private String comment;

    // comment 작성 시간
    private Timestamp commentUpdatedAt;

    // comment를 작성한 의료진
    private String staffId;

    public CommentInfoVO(CommentInfo commentInfo) {
        this.commentId = commentInfo.getCommentId();
        this.staffId = commentInfo.getStaffInfo().getStaffId();
        this.admissionId = commentInfo.getAdmissionInfo().getAdmissionId();
        this.comment = commentInfo.getComment();
        this.commentUpdatedAt = commentInfo.getCommentUpdatedAt();
    }
}
