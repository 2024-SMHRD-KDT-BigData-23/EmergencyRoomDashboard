package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdmissionListViewRepository extends JpaRepository<AdmissionListView, Long> {




}
