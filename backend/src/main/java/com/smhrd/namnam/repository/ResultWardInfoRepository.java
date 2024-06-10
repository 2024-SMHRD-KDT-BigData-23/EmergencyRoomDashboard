package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.ResultWardInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultWardInfoRepository extends JpaRepository<ResultWardInfo, Long> {
    ResultWardInfo findTopByAdmissionInfoOrderByResultWardUpdatedAtDesc(AdmissionInfo admissionInfo);
}
