package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.StaffInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffInfoRepository extends JpaRepository<StaffInfo, String> {
    long countByStaffStatus(String status);

    StaffInfo findByStaffId(String staffId);


    ///////////////////////role페이지/////////////////////////////////
    @Query(value = "SELECT s.*, " +
            "(SELECT ua.activity_date " +
            " FROM user_activity ua " +
            " WHERE ua.staff_id = s.staff_id " +
            " AND ua.activity_type = 'login' " +
            " ORDER BY ua.activity_date DESC " +
            " LIMIT 1) AS activity_date " +
            "FROM staff_info s", nativeQuery = true)
    List<StaffInfo> findStaffInfo();
}
