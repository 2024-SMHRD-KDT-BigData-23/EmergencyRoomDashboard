package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.PatientVitalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientVitalInfoRepository extends JpaRepository<PatientVitalInfo, String> {
}
