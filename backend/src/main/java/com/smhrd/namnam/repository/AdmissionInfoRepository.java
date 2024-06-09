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

    //////////////////////////////////////admin log 페이지///////////////////////
    // result_ward가 결정된 admission_id 전체 리스트(최신순)
//    List<AdmissionInfo> findByAdmissionResultWardIsNotNullOrderByAdmissionOutTimeDesc();

    // log페이지 검색기능(staff_id, result_ward, 날짜)
    @Query(value = "SELECT * FROM admission_info " +
            "WHERE ((admission_in_time BETWEEN :outTimeStart AND :outTimeEnd) OR (:outTimeStart = '' OR :outTimeEnd = '')) " +
            "AND ((staff_id = :staffId) OR (:staffId = '')) " +
            "AND ((admission_result_ward = :resultWard) OR (:resultWard = '')) " +
            "AND admission_result_ward IS NOT NULL " +
            "ORDER BY admission_out_time DESC",
            nativeQuery = true)
    List<AdmissionInfo> searchResultWardLog(@Param("staffId") String staffId,
                                            @Param("resultWard") String resultWard,
                                            @Param("outTimeStart") String outTimeStart,
                                            @Param("outTimeEnd") String outTimeEnd);
    //////////////////////////////////////////////////////////////////////////////////////////////////
}
