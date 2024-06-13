package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.HospitalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalInfoRepository extends JpaRepository<HospitalInfo, Long> {
}
