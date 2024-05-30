package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.repository.AdmissionInfoRepository;
import com.smhrd.namnam.repository.AdmissionListViewRepository;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.AdmissionListViewVO;
import org.modelmapper.ModelMapper;
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

    @Autowired
    private ModelMapper modelMapper;

    // entity list 형태 -> vo list형태로 변환 메서드
    private List<AdmissionListViewVO> convertToVOList(List<AdmissionListView> admissionListView) {
        return admissionListView.stream().map(entity -> modelMapper.map(entity, AdmissionListViewVO.class))
                .collect(Collectors.toList());
    }

    // entity 형태 -> vo 형태로 변환 메서드
    private AdmissionListViewVO convertToVO(AdmissionListView admissionListView){
        return modelMapper.map(admissionListView, AdmissionListViewVO.class);
    }

    //////////////////////////////////////////현재 페이지/////////////////////////////////////////
    // 응급실 진료 중인 환자들 전체 조회(각 입원코드마다 가장최신)
    public List<AdmissionListViewVO> findMedicalPatients() {
        return convertToVOList(admissionViewRepo.findMedicalPatients());
    }

    // 응급실 진료 중인 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    public List<AdmissionListViewVO> findMedicalPatientsByWard(String ward) {
        return convertToVOList(admissionViewRepo.findMedicalPatientsByWard(ward));
    }

    // 응급실 진료 중인 환자들 중 ncdss 검색(각 입원코드마다 가장최신)
    public List<AdmissionListViewVO> findMedicalPatientsByDeepNcdss(String ncdss) {
        return convertToVOList(admissionViewRepo.findAllByAdmissionResultWardIsNullAndDeepNcdss(ncdss));
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
    public List<AdmissionListViewVO> findPastPatients() {
        return convertToVOList(admissionViewRepo.findPastPatients());
    }


    // 과거 응급실 진료 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    public List<AdmissionListViewVO> findPastPatientsByWard(String ward) {
        return convertToVOList(admissionViewRepo.findPastPatientsByWard(ward));
    }

    // 과거 응급실 진료 환자들 중 ncdss 검색(각 입원코드마다 가장 최신)
    public List<AdmissionListViewVO> findPastPatientsByDeepNcdss(String ncdss) {
        return convertToVOList(admissionViewRepo.findPastPatientsByDeepNcdss(ncdss));
    }

    ///////////////////////////////////////////////////////////////////////////////////////////





    //////////////////////////////////상세 페이지////////////////////////////////////////
    // 특정 입원코드에 대한 상세 정보
    public List<AdmissionListViewVO> findPatientDetailsByAdmissionId(String admissionId) {
        return convertToVOList(admissionViewRepo.findPatientDetailByAdmissionId(admissionId));
    }
    ////////////////////////////////////////////////////////////////////////////////////






    /////////////////////////////////검색 관련////////////////////////////////////////////
    // 검색페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    public List<AdmissionListViewVO> searchByPatientNameId(String patientNameId){
        return convertToVOList(admissionViewRepo.searchByPatientNameId(patientNameId));
    }

    // 현재 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    public List<AdmissionListViewVO> nowSearchByPatientNameId(String patientNameId) {
        return convertToVOList(admissionViewRepo.nowSearchByPatientNameId(patientNameId));
    }

    // 과거 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    public List<AdmissionListViewVO> pastSearchByPatientNameId(String patientNameId) {
        return convertToVOList(admissionViewRepo.pastSearchByPatientNameId(patientNameId));
    }
    /////////////////////////////////////////////////////////////////////////////////////
}
