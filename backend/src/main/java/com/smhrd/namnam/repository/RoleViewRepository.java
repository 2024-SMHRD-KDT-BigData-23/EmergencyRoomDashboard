package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.RoleView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleViewRepository extends JpaRepository<RoleView, Long> {


    @Query(value = "SELECT * FROM role_view " +
            "WHERE ((staff_id = :staffId) OR (:staffId = 'All')) " +
            "AND ((staff_role = :staffRole) OR (:staffRole = 'All Roles')) " +
            "AND ((staff_status = :staffStatus) OR (:staffStatus = 'All Statuses'))",
            nativeQuery = true)
    List<RoleView> searchStaffInfo(@Param("staffId") String staffId, @Param("staffRole") String staffRole, @Param("staffStatus") String staffStatus);
}
