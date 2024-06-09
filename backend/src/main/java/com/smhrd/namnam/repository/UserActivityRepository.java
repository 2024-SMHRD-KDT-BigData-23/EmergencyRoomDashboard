package com.smhrd.namnam.repository;


import com.smhrd.namnam.entity.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {
    List<UserActivity> findByActivityDateBetween(LocalDateTime startDate,LocalDateTime endDate);


}
