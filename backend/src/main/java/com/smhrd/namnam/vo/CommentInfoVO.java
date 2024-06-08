package com.smhrd.namnam.vo;

import java.sql.Timestamp;

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
}
