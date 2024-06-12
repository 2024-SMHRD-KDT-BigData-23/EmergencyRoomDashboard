package com.smhrd.namnam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "log_view")
@AllArgsConstructor
@NoArgsConstructor
@Immutable
//@Subselect(
//        "SELECT " +
//                "ROW_NUMBER() OVER () AS log_id, " +
//                "result_ward_updated_at AS log_time, " +
//                "result_ward AS log_action, " +
//                "staff_id AS log_user, " +
//                "admission_id AS log_detail " +
//                "FROM result_ward_info " +
//                "UNION ALL " +
//                "SELECT " +
//                "ROW_NUMBER() OVER (ORDER BY activity_date DESC) + (SELECT COUNT(*) FROM result_ward_info) AS log_id, " +
//                "activity_date AS log_time, " +
//                "activity_type AS log_action, " +
//                "staff_id AS log_user, " +
//                "activity_type AS log_detail " +
//                "FROM user_activity " +
//                "ORDER BY timestamp DESC"
//)

public class LogView {

    // 로그 식별자
    @Id
    @Column(name = "log_id")
    private Long logId;

    // 로그시간
    @Column(name = "log_time")
    private Timestamp logTime;

    // 활동 종류
    @Column(name = "log_action")
    private String logAction;

    // 사용자
    @Column(name = "log_user")
    private String logUser;

    // 상세내역
    @Column(name = "log_detail")
    private String logDetail;


}
