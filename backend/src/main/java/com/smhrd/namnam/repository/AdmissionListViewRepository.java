package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.AdmissionListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdmissionListViewRepository extends JpaRepository<AdmissionListView, Long> {

    List<AdmissionListView> findAllByPatientVitalAcuity(int acuity);

    List<AdmissionListView> findAllByDeepNcdss(String ncdss);
}
