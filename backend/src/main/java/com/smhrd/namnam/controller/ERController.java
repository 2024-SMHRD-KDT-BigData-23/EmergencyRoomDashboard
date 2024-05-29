package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.service.ERService;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ER")
public class ERController {

    @Autowired
    private ERService erService;

    // 응급실 진료 중인 환자들 전체 조회(각 입원코드마다 가장최신)
    @GetMapping("/medical-patients")
    public List<AdmissionListView> findMedicalPatients() {
        return erService.findMedicalPatients();
    }

    // 응급실 진료 중인 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    @GetMapping("/search-acuity/medical-patients/{ward}")
    public List<AdmissionListView> findMedicalPatientsByWard(@PathVariable("ward") String ward) {
       return erService.findMedicalPatientsByPatientVitalWard(ward);
    }

    // 응급실 진료 중인 환자들 중 ncdss 검색(각 입원코드마다 가장최신)
    @GetMapping("/search-ncdss/medical-patients/{ncdss}")
    public List<AdmissionListView> findMedicalPatientsByDeepNcdss(@PathVariable("ncdss") String deepNcdss) {
        return erService.findMedicalPatientsByDeepNcdss(deepNcdss);
    }

    // 응급실 진료 후 result_ward 수정
    @PatchMapping("/set/medical-patients/{admissionId}")
    public AdmissionInfo saveMedicalPatientsByAdmissionId(@PathVariable("admissionId") String admissionId, @RequestBody AdmissionInfoVO vo) {
        vo.setAdmissionId(admissionId);
        return erService.saveMedicalPatientsByAdmissionId(vo);
    }
}




