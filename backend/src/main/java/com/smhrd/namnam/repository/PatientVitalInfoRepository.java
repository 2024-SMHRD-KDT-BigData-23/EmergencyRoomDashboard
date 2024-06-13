package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.PatientVitalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientVitalInfoRepository extends JpaRepository<PatientVitalInfo, Long> {

    PatientVitalInfo findTopByAdmissionInfoOrderByPatientVitalCreatedAtDesc(AdmissionInfo selectedAdmission);

    List<PatientVitalInfo> findByAdmissionInfo(AdmissionInfo selectedAdmission);
}
