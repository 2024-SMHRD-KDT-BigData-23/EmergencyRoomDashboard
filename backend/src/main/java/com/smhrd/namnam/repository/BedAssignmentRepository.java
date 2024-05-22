package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.BedAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BedAssignmentRepository extends JpaRepository<BedAssignment, Long> {
}
