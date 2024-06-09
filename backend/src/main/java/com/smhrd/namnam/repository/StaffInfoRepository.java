package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.StaffInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffInfoRepository extends JpaRepository<StaffInfo, String> {
    long countByStaffStatus(String status);

    StaffInfo findByStaffId(String staffId);
}
