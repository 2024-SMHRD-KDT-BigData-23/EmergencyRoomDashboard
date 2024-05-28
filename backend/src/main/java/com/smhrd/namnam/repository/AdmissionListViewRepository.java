package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdmissionListViewRepository extends JpaRepository<AdmissionListView, Long> {

    List<AdmissionListView> findAllByAdmissionResultWardIsNull();

    List<AdmissionListView> findAllByAdmissionResultWardIsNullAndPatientVitalAcuity(int acuity);

    List<AdmissionListView> findAllByAdmissionResultWardIsNullAndDeepNcdss(String ncdss);

    // 특정 입원코드에 대한 상세 정보
    List<AdmissionListView> findPatientDetailByAdmissionId(String admissionId);

    // 특정 이름에 대한 입원 내역 정보(검색)
    List<AdmissionListView> searchNameByPatientName(String patientName);

}
