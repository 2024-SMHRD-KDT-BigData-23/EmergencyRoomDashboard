package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.AdmissionListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdmissionInfoRepository extends JpaRepository<AdmissionInfo, Long> {
    AdmissionInfo findByAdmissionId(String admissionId);

    //////////////////////////////////////admin log 페이지///////////////////////
    // result_ward가 결정된 admission_id 전체 리스트(최신순)
    List<AdmissionInfo> findByAdmissionResultWardIsNotNullOrderByAdmissionOutTimeDesc();
    //////////////////////////////////////////////////////////////////////////////////////////////////
}
