package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.BedInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BedInfoRepository extends JpaRepository<BedInfo, String> {
}
