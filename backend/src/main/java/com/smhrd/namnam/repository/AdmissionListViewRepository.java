package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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


    // 특정 이름에 대한 입원 내역 정보(검색, 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE patient_name = :patientName " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE a.patient_name = :patientName",
            nativeQuery = true)
    List<AdmissionListView> searchByPatientName(String patientName);



    // 특정 id에 대한 입원 내역 정보(검색, 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE patient_id = :patientId " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE a.patient_id = :patientId",
            nativeQuery = true)
    List<AdmissionListView> searchByPatienId(String patientId);
}
