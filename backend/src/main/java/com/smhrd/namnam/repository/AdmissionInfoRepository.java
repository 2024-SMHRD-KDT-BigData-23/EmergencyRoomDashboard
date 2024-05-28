package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdmissionInfoRepository extends JpaRepository<AdmissionInfo, Long> {
    AdmissionInfo findByAdmissionId(String admissionId);
}
