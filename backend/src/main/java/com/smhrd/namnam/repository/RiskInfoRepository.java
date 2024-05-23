package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.RiskInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskInfoRepository extends JpaRepository<RiskInfo, String> {
}
