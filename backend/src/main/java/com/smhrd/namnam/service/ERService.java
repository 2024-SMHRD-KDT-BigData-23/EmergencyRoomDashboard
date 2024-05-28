package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.repository.AdmissionListViewRepository;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ERService {

    @Autowired
    private AdmissionListViewRepository admissionViewRepo;

    public List<AdmissionListView> findMedicalPatients() {
        return admissionViewRepo.findAllByAdmissionResultWardIsNull();
    }

    public List<AdmissionListView> findMedicalPatientsByPatientVitalAcuity(int acuity) {
        return admissionViewRepo.findAllByAdmissionResultWardIsNullAndPatientVitalAcuity(acuity);
    }

    public List<AdmissionListView> findMedicalPatientsByDeepNcdss(String deepNcdss) {
        return admissionViewRepo.findAllByAdmissionResultWardIsNullAndDeepNcdss(deepNcdss);
    }

    public Optional<AdmissionInfoVO> saveMedicalPatientsByAdmissionId(String admissionId, AdmissionInfoVO vo) {
        return admissionViewRepo.saveByAdmissionId(vo.getAdmissionResultWard());
    }
}
