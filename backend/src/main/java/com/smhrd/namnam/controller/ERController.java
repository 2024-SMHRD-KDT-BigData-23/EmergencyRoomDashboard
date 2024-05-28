package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.service.ERService;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.AdmissionListViewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ER")
public class ERController {

    @Autowired
    private ERService erService;

    // 응급실 진료 중인 환자들 전체 조회
    @GetMapping("/medical-patients")
    public List<AdmissionListView> findMedicalPatients() {
        return erService.findMedicalPatients();
    }

    // 응급실 진료 중인 환자들 중 acuity 검색
    @GetMapping("/search-acuity/medical-patients/{acuity}")
    public List<AdmissionListView> findMedicalPatientsByAcuity(@PathVariable("acuity") int acuity) {
       return erService.findMedicalPatientsByPatientVitalAcuity(acuity);
    }

    // 응급실 진료 중인 환자들 중 ncdss 검색
    @GetMapping("/search-ncdss/medical-patients/{ncdss}")
    public List<AdmissionListView> findMedicalPatientsByDeepNcdss(@PathVariable("ncdss") String deepNcdss) {
        return erService.findMedicalPatientsByDeepNcdss(deepNcdss);
    }

    // 응급실 진료 후 result_ward 수정
    @PatchMapping("/set/medical-patients/{admissionId}")
    public Optional<AdmissionInfoVO> saveMedicalPatientsByAdmissionId(@PathVariable("admissionId") String admissionId, @RequestBody AdmissionInfoVO vo) {
        return erService.saveMedicalPatientsByAdmissionId(admissionId, vo);
    }
}




