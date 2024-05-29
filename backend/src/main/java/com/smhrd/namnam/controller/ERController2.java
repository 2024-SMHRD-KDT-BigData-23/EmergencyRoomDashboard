package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.service.ERService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ER2")
public class ERController2 {

    @Autowired
    private ERService2 erService2;

    // 특정 입원코드에 대한 상세 정보
    @GetMapping("/patient-details/{admissionId}")
    public List<AdmissionListView> findPatientDetailsByAdmissionId(@PathVariable("admissionId") String admissionId){
        return erService2.findPatientDetailsByAdmissionId(admissionId);
    }


    // 특정 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @GetMapping("/search/patient-name-id/{patient}")
    public List<AdmissionListView> searchByPatientNameId(@PathVariable("patient") String patient){
            return erService2.searchByPatientNameId(patient);
        }

}
