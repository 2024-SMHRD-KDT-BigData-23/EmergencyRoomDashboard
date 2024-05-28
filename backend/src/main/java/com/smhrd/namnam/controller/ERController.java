package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.service.ERService;
import com.smhrd.namnam.vo.AdmissionListViewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ER")
public class ERController {

    @Autowired
    private ERService erService;

    // 응급실 진료 중인 환자들 전체 조회
    @GetMapping("/medical-patients")
    public List<AdmissionListView> findMedicalPatients() {
        return erService.findMedicalPatients();
    }
}
