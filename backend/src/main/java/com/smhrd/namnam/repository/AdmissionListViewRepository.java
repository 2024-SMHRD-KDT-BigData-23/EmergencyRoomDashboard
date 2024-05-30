package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.AdmissionListViewVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface

AdmissionListViewRepository extends JpaRepository<AdmissionListView, Long> {

    //////////////////////////////////////////현재 페이지/////////////////////////////////////////
    // 응급실 진료 중인 환자들 전체 조회(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE admission_result_ward IS NULL " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE admission_result_ward IS NULL",
            nativeQuery = true)
    List<AdmissionListView> findMedicalPatients();

//    // jpa 효율성 판별 테스트용
//    List<AdmissionListView> findAllByAdmissionResultWardIsNull();


    // 응급실 진료 중인 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE admission_result_ward IS NULL AND bed_ward = :ward " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE admission_result_ward IS NULL AND bed_ward = :ward",
            nativeQuery = true)
    List<AdmissionListView> findMedicalPatientsByWard(@Param("ward") String ward);

    // 응급실 진료 중인 환자들 중 ncdss 검색(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE admission_result_ward IS NULL AND deep_ncdss = :ncdss " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE admission_result_ward IS NULL AND deep_ncdss = :ncdss",
            nativeQuery = true)
        List<AdmissionListView> findAllByAdmissionResultWardIsNullAndDeepNcdss(@Param("ncdss") String ncdss);
    /////////////////////////////////////////////////////////////////////////////////////





    ////////////////////////////////과거 페이지/////////////////////////////////////
    // 과거 응급실 진료 환자들 전체 조회(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE admission_result_ward IS NOT NULL " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE admission_result_ward IS NOT NULL",
            nativeQuery = true)
    List<AdmissionListView> findPastPatients();

    // 과거 응급실 진료 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE admission_result_ward IS NOT NULL AND bed_ward = :ward " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE admission_result_ward IS NOT NULL AND bed_ward = :ward",
            nativeQuery = true)
    List<AdmissionListView> findPastPatientsByWard(@Param("ward") String ward);

    // 과거 응급실 진료 환자들 중 ncdss 검색(각 입원코드마다 가장 최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE admission_result_ward IS NOT NULL AND deep_ncdss = :ncdss " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE admission_result_ward IS NOT NULL AND deep_ncdss = :ncdss",
            nativeQuery = true)
    List<AdmissionListView> findPastPatientsByDeepNcdss(@Param("ncdss") String ncdss);

    //////////////////////////////////////////////////////////////////////////////





    /////////////////////////////////////상세 페이지//////////////////////////////////
    // 특정 입원코드에 대한 상세 정보
    List<AdmissionListView> findPatientDetailByAdmissionId(String admissionId);
    ////////////////////////////////////////////////////////////////////////////////






    ////////////////////////////////////////검색 관련////////////////////////////////////////
    // 검색페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE patient_name = :patientNameId OR patient_id = :patientNameId " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE a.patient_name = :patientNameId OR a.patient_id = :patientNameId",
            nativeQuery = true)
    List<AdmissionListView> searchByPatientNameId(@Param("patientNameId") String patientNameId);

    // 현재 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE (patient_name = :patientNameId OR patient_id = :patientNameId) AND admission_result_ward IS NULL " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE (a.patient_name = :patientNameId OR a.patient_id = :patientNameId) AND a.admission_result_ward IS NULL",
            nativeQuery = true)
    List<AdmissionListView> nowSearchByPatientNameId(@Param("patientNameId") String patientNameId);

    // 과거 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @Query(value = "SELECT a.* FROM admission_list_view a " +
            "JOIN (SELECT admission_id, MAX(patient_vital_created_at) AS max_vital_time " +
            "FROM admission_list_view " +
            "WHERE (patient_name = :patientNameId OR patient_id = :patientNameId) AND admission_result_ward IS NOT NULL " +
            "GROUP BY admission_id) b " +
            "ON a.admission_id = b.admission_id AND a.patient_vital_created_at = b.max_vital_time " +
            "WHERE (a.patient_name = :patientNameId OR a.patient_id = :patientNameId) AND a.admission_result_ward IS NOT NULL",
            nativeQuery = true)
    List<AdmissionListView> pastSearchByPatientNameId(@Param("patientNameId") String patientNameId);
    /////////////////////////////////////////////////////////////////////////////////////////////////////

}
