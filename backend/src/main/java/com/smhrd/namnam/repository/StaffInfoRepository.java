package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.vo.StaffInfoVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffInfoRepository extends JpaRepository<StaffInfo, String> {
    long countByStaffStatus(String status);

    StaffInfo findByStaffId(String staffId);
}
