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

    public List<AdmissionListView> findMedicalPatients() {
        return admissionViewRepo.findAllByAdmissionResultWardIsNull();
    }

    public List<AdmissionListView> findMedicalPatientsByPatientVitalAcuity(int acuity) {
        return admissionViewRepo.findAllByAdmissionResultWardIsNullAndPatientVitalAcuity(acuity);
    }

    public List<AdmissionListView> findMedicalPatientsByDeepNcdss(String deepNcdss) {
        return admissionViewRepo.findAllByAdmissionResultWardIsNullAndDeepNcdss(deepNcdss);
    }


    public AdmissionInfo saveMedicalPatientsByAdmissionId(AdmissionInfoVO vo) {
        AdmissionInfo entity = admissionRepo.findByAdmissionId(vo.getAdmissionId());
        entity.setAdmissionResultWard(vo.getAdmissionResultWard());
        return admissionRepo.save(entity);
    }

}
