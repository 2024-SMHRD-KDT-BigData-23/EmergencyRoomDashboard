package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.repository.AdmissionListViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ERService2 {

    @Autowired
    private AdmissionListViewRepository admissionListViewRepo;

    // 특정 입원코드에 대한 상세 정보
    public List<AdmissionListView> findPatientDetailsByAdmissionId(String admissionId) {
        return admissionListViewRepo.findPatientDetailByAdmissionId(admissionId);
    }

    // 특정 이름에 대한 입원 내역 정보(검색, 가장최신)
    public List<AdmissionListView> searchByPatientName(String patientName){
        return admissionListViewRepo.searchByPatientName(patientName);
    }

    // 특정 id에 대한 입원 내역 정보(검색, 가장최신)
    public List<AdmissionListView> searchByPatientId(String patientId) {
        return admissionListViewRepo.searchByPatienId(patientId);
    }
}
