package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.repository.AdmissionInfoRepository;
import com.smhrd.namnam.repository.AdmissionListViewRepository;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ERService {

    @Autowired
    private AdmissionListViewRepository admissionViewRepo;

    @Autowired
    private AdmissionInfoRepository admissionRepo;

    // 응급실 진료 중인 환자들 전체 조회(각 입원코드마다 가장최신)
    public List<AdmissionListView> findMedicalPatients() {
        return admissionViewRepo.findAllByAdmissionResultWardIsNull();
    }

    // 응급실 진료 중인 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    public List<AdmissionListView> findMedicalPatientsByPatientVitalWard(String ward) {
        return admissionViewRepo.findAllByAdmissionResultWardIsNullAndPatientVitalWard(ward);
    }

    // 응급실 진료 중인 환자들 중 ncdss 검색(각 입원코드마다 가장최신)
    public List<AdmissionListView> findMedicalPatientsByDeepNcdss(String deepNcdss) {
        return admissionViewRepo.findAllByAdmissionResultWardIsNullAndDeepNcdss(deepNcdss);
    }

    // 응급실 진료 후 result_ward 수정
    public AdmissionInfo saveMedicalPatientsByAdmissionId(AdmissionInfoVO vo) {
        AdmissionInfo entity = admissionRepo.findByAdmissionId(vo.getAdmissionId());
        entity.setAdmissionResultWard(vo.getAdmissionResultWard());
        return admissionRepo.save(entity);
    }

}
