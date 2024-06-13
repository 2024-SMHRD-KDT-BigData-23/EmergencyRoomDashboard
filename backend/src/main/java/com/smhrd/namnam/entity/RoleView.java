package com.smhrd.namnam.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import java.sql.Timestamp;

@Entity
@Table(name = "role_view")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Immutable
@Subselect("SELECT ROW_NUMBER() OVER () AS role_view_id, s.*, ua.activity_date " +
        "FROM staff_info s " +
        "LEFT JOIN (" +
        "    SELECT staff_id, MAX(activity_date) AS activity_date " +
        "    FROM user_activity " +
        "    WHERE activity_type = 'login' " +
        "    GROUP BY staff_id " +
        ") ua ON s.staff_id = ua.staff_id")
public class RoleView {

    // 뷰 식별자
    @Id
    @Column(name = "role_view_id")
    private Long roleViewId;

    // 병원 식별자
    @Column(name = "hospital_id")
    private Long hospitalId;

    // 유저 생성 시간
    @Column(name = "staff_created_at")
    private Timestamp staffCreatedAt;

    // 로그인 권한;
    @Column(name = "staff_authority")
    private String staffAuthority;

    // 유저 아이디
    @Column(name = "staff_id")
    private String staffId;

    // 유저 이름
    @Column(name = "staff_name")
    private String staffName;

    // 유저 직위
    @Column(name = "staff_role")
    private String staffRole;

    // 활동 상태
    @Column(name = "staff_status")
    private String staffStatus;

    // 유저 비밀번호
    @Column(name = "staff_pw")
    private String staffPw;

    // 마지막 로그인 날짜
    @Column(name = "activity_date")
    private Timestamp activityDate;

}
