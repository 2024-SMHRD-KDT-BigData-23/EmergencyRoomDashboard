package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.ResultWardInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResultWardInfoRepository extends JpaRepository<ResultWardInfo, Long> {

    //////////////////////////////////// admin log 페이지////////////////////////////////////
    // result_ward가 결정된 admission_id 전체 리스트
    @Query(value = "SELECT * FROM result_ward_info ORDER BY result_ward_updated_at DESC", nativeQuery = true)
    List<ResultWardInfo> findAllOrderByResultWardUpdatedAtDesc();


    // log페이지 result_ward관련 검색기능(staff_id, result_ward, 날짜)
    @Query(value = "SELECT * FROM result_ward_info " +
            "WHERE ((result_ward_updated_at BETWEEN :outTimeStart AND :outTimeEnd) OR (:outTimeStart = '' OR :outTimeEnd = '')) " +
            "AND ((staff_id = :staffId) OR (:staffId = '')) " +
            "AND ((result_ward = :resultWard) OR (:resultWard = '')) " +
            "AND result_ward IS NOT NULL " +
            "ORDER BY result_ward_updated_at DESC",
            nativeQuery = true)
    List<ResultWardInfo> searchResultWardLog(@Param("staffId") String staffId,
                                            @Param("resultWard") String resultWard,
                                            @Param("outTimeStart") String outTimeStart,
                                            @Param("outTimeEnd") String outTimeEnd);
    //////////////////////////////////////////////////////////////////////////////////////////////////
}
