package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.CommentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface CommentInfoRepository extends JpaRepository<CommentInfo, Long> {

    List<CommentInfo> findByAdmissionInfoOrderByCommentUpdatedAtDesc(AdmissionInfo byAdmissionId);
}
