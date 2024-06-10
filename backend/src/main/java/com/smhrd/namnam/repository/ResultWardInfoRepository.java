package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.ResultWardInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.List;

public interface ResultWardInfoRepository extends JpaRepository<ResultWardInfo, Long> {

    ResultWardInfo findTopByAdmissionInfoOrderByResultWardUpdatedAtDesc(AdmissionInfo admissionInfo);

}
