package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.repository.AdmissionListViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ERService {

    @Autowired
    private AdmissionListViewRepository admissionViewRepo;

    public List<AdmissionListView> findMedicalPatients() {
        return admissionViewRepo.findAll();
    }
}
