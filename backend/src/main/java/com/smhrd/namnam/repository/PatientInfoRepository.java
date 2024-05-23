package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.PatientInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientInfoRepository extends JpaRepository<PatientInfo, String> {
}
