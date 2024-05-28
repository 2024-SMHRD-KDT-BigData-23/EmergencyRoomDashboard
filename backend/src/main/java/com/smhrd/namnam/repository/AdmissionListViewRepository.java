package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdmissionListViewRepository extends JpaRepository<AdmissionListView, String> {

}
