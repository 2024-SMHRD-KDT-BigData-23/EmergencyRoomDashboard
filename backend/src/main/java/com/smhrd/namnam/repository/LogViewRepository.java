package com.smhrd.namnam.repository;


import com.smhrd.namnam.entity.LogView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogViewRepository extends JpaRepository<LogView, Long> {

    // admin log 리스트(login로그, resultWard로그 최신순
    @Query(value = "SELECT * " +
            "FROM log_view " +
            "ORDER BY log_time DESC",
            nativeQuery = true)
    List<LogView> findAllOrderByLogTimeDesc();

    // admin log 검색(staff_id, action, 날짜)
    @Query(value = "SELECT * FROM log_view " +
            "WHERE ((log_time BETWEEN :logTimeStart AND :logTimeEnd) OR (:logTimeStart = '' OR :logTimeEnd = '')) " +
            "AND ((log_user = :logUser) OR (:logUser = '')) " +
            "AND ((log_action = :logAction) OR (:logAction = '')) " +
            "ORDER BY log_time DESC",
            nativeQuery = true)
    List<LogView> searchlogInfo(@Param("logUser") String logUser, @Param("logAction") String logAction,
                                @Param("logTimeStart") String logTimeStart, @Param("logTimeEnd") String logTimeEnd);

}
