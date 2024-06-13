package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface AdmissionInfoRepository extends JpaRepository<AdmissionInfo, Long> {
    AdmissionInfo findByAdmissionId(String admissionId);
}
