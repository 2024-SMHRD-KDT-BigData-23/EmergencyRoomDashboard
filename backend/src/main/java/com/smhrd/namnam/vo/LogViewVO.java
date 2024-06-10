package com.smhrd.namnam.vo;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogViewVO {

    // 로그 식별자
    private Long logId;

    // 로그시간
    private Timestamp logTime;

    // 활동 종류
    private String logAction;

    // 사용자
    private String logUser;

    // 상세내역
    private String logDetail;
}
