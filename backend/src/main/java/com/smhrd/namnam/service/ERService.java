package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.repository.AdmissionInfoRepository;
import com.smhrd.namnam.repository.AdmissionListViewRepository;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.AdmissionListViewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ERService {

    @Autowired
    private AdmissionListViewRepository admissionViewRepo;

    @Autowired
    private AdmissionInfoRepository admissionRepo;

    //////////////////////////////////////////현재 페이지/////////////////////////////////////////
    // 응급실 진료 중인 환자들 전체 조회(각 입원코드마다 가장최신)
    public List<AdmissionListView> findMedicalPatients() {
        return admissionViewRepo.findMedicalPatients();
    }

    // 응급실 진료 중인 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    public List<AdmissionListView> findMedicalPatientsByWard(String ward) {
        return admissionViewRepo.findMedicalPatientsByWard(ward);
    }

    // 응급실 진료 중인 환자들 중 ncdss 검색(각 입원코드마다 가장최신)
    public List<AdmissionListView> findMedicalPatientsByDeepNcdss(String ncdss) {
        return admissionViewRepo.findAllByAdmissionResultWardIsNullAndDeepNcdss(ncdss);
    }

    // 응급실 진료 후 result_ward 수정
    public AdmissionInfo saveMedicalPatientsByAdmissionId(AdmissionInfoVO vo) {
        AdmissionInfo entity = admissionRepo.findByAdmissionId(vo.getAdmissionId());
        entity.setAdmissionResultWard(vo.getAdmissionResultWard());
        return admissionRepo.save(entity);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////





    /////////////////////////////////////////과거 페이지/////////////////////////////////////////
    // 과거 응급실 진료 환자들 전체 조회(각 입원코드마다 가장최신)
    public List<AdmissionListView> findPastPatients() {
        return admissionViewRepo.findPastPatients();
    }


    // 과거 응급실 진료 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    public List<AdmissionListView> findPastPatientsByWard(String ward) {
        return admissionViewRepo.findPastPatientsByWard(ward);
    }

    // 과거 응급실 진료 환자들 중 ncdss 검색(각 입원코드마다 가장 최신)
    public List<AdmissionListView> findPastPatientsByDeepNcdss(String ncdss) {
        return admissionViewRepo.findPastPatientsByDeepNcdss(ncdss);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////





    //////////////////////////////////상세 페이지////////////////////////////////////////
    // 특정 입원코드에 대한 상세 정보
    public List<AdmissionListView> findPatientDetailsByAdmissionId(String admissionId) {
        return admissionViewRepo.findPatientDetailByAdmissionId(admissionId);
    }
    ////////////////////////////////////////////////////////////////////////////////////






    /////////////////////////////////검색 관련////////////////////////////////////////////
    // 검색페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    public List<AdmissionListView> searchByPatientNameId(String patientNameId){
        return admissionViewRepo.searchByPatientNameId(patientNameId);
    }

    // 현재 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    public List<AdmissionListView> nowSearchByPatientNameId(String patientNameId) {
        return admissionViewRepo.nowSearchByPatientNameId(patientNameId);
    }

    // 과거 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    public List<AdmissionListView> pastSearchByPatientNameId(String patientNameId) {
        return admissionViewRepo.pastSearchByPatientNameId(patientNameId);
    }
    /////////////////////////////////////////////////////////////////////////////////////
}
