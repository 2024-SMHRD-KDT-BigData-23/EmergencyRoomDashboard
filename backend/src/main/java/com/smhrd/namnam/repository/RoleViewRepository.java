package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.RoleView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleViewRepository extends JpaRepository<RoleView, Long> {
}
