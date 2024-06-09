package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "comment_info")
@AllArgsConstructor
@NoArgsConstructor
public class CommentInfo {

    // comment 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    // comment를 작성한 입실 코드
    @ManyToOne
    @JoinColumn(name = "admission_id")
    private AdmissionInfo admissionInfo;

    // comment
    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    // comment 작성 시간
    @UpdateTimestamp
    @Column(name = "comment_updated_at")
    private Timestamp commentUpdatedAt;

    // comment를 작성한 의료진
    @ManyToOne
    @JoinColumn(name = "staff_id")
    private StaffInfo staffInfo;
}