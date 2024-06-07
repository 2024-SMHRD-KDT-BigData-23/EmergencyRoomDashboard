package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.ERView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ERViewRepository extends JpaRepository<ERView, Long> {

    //////////////////////////////////////////리스트 페이지(과거,현재)/////////////////////////////////////////
    // 현재, 과거 페이지 전체 조회(각 입원코드마다 가장최신) -> ward, ncdss 적용
    @Query(value = "SELECT a.* FROM er_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM er_view " +
            "WHERE ((:admissionResultWard = 'now' AND admission_result_ward IS NULL) OR admission_result_ward IS NOT NULL) " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE ((:admissionResultWard = 'now' AND a.admission_result_ward IS NULL) OR a.admission_result_ward IS NOT NULL) " +
            "AND (:ward = 'All' OR bed_ward = :ward) " +
            "AND (:ncdss = 'All' OR deep_ncdss = :ncdss) " +
            "ORDER BY a.admission_in_time ASC",
            nativeQuery = true)
    List<ERView> findMedicalPatients(@Param("ward") String ward, @Param("ncdss") String ncdss, @Param("admissionResultWard") String admissionResultWard);

    // 현재, 과거 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM er_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM er_view " +
            "WHERE (patient_name = :patientNameId OR patient_id = :patientNameId) " +
            "AND ((:admissionResultWard = 'now' AND admission_result_ward IS NULL) OR admission_result_ward IS NOT NULL) " +
            "GROUP BY admission_id) b ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE (a.patient_name = :patientNameId OR a.patient_id = :patientNameId) " +
            "OR (:patientNameId IS NULL) "+
            "AND ((:admissionResultWard = 'now' AND a.admission_result_ward IS NULL) OR a.admission_result_ward IS NOT NULL)",
            nativeQuery = true)
    List<ERView> searchByPatientNameId(@Param("patientNameId") String patientNameId,
                                                  @Param("admissionResultWard") String admissionResultWard);
    /////////////////////////////////////////////////////////////////////////////////////



    /////////////////////////////////////상세 페이지//////////////////////////////////
    // 특정 입원코드에 대한 상세 정보
    List<ERView> findPatientDetailByAdmissionId(String admissionId);
    // 환자 ncdss update
    Optional<ERView> findByAdmissionId(String admissionId);
    ////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////검색 페이지////////////////////////////////////////
    // 검색페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM er_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM er_view " +
            "WHERE patient_name = :patientNameId OR patient_id = :patientNameId " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE a.patient_name = :patientNameId OR a.patient_id = :patientNameId "+
            "ORDER BY a.admission_in_time DESC",
            nativeQuery = true)
    List<ERView> allSearchByPatientNameId(@Param("patientNameId") String patientNameId);

    /////////////////////////////////////////////////////////////////////////////////////////////////////
}
