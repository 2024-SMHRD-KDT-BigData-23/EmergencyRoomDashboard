package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.ERView;
import com.smhrd.namnam.repository.AdmissionInfoRepository;
import com.smhrd.namnam.repository.ERViewRepository;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.ERViewVO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ERService {

    @Autowired
    private ERViewRepository erViewRepo;

    @Autowired
    private AdmissionInfoRepository admissionRepo;

    @Autowired
    private ModelMapper modelMapper;

    // entity list 형태 -> vo list형태로 변환 메서드
    private List<ERViewVO> convertToVOList(List<ERView> admissionListView) {
        return admissionListView.stream().map(entity -> modelMapper.map(entity, ERViewVO.class))
                .collect(Collectors.toList());
    }

    // entity 형태 -> vo 형태로 변환 메서드
    private ERViewVO convertToVO(ERView admissionListView){
        return modelMapper.map(admissionListView, ERViewVO.class);
    }

    //////////////////////////////////////////리스트 페이지(과거,현재)/////////////////////////////////////////
    // 현재, 과거 환자들 전체 조회(각 입원코드마다 가장최신) / 현재, 과거 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    public List<ERViewVO> findMedicalPatients(String bedward, String deepNcdss, String patientNameId, String admissionResultWard) {
        if(patientNameId.equals("null")){
                return convertToVOList(erViewRepo.findMedicalPatients(bedward, deepNcdss, admissionResultWard));
        }else{
            System.out.println("admissionResultWard : "+ admissionResultWard);
            System.out.println("patientNameId : "+ patientNameId);
            return convertToVOList(erViewRepo.searchByPatientNameId(patientNameId, admissionResultWard));
        }
    }

    // 응급실 진료 후 result_ward 수정
    public AdmissionInfo saveMedicalPatientsByAdmissionId(AdmissionInfoVO vo) {
        AdmissionInfo entity = admissionRepo.findByAdmissionId(vo.getAdmissionId());
        entity.setAdmissionResultWard(Objects.isNull(vo.getAdmissionResultWard()) ? entity.getAdmissionResultWard() : vo.getAdmissionResultWard());
        entity.setAdmissionComment(Objects.isNull(vo.getAdmissionComment()) ? entity.getAdmissionComment() : vo.getAdmissionComment());
        entity.setAdmissionOutTime(Timestamp.valueOf(LocalDateTime.now()));
        return admissionRepo.save(entity);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////상세 페이지////////////////////////////////////////
    // 특정 입원코드에 대한 상세 정보
    public List<ERViewVO> findPatientDetailsByAdmissionId(String admissionId) {
        return convertToVOList(erViewRepo.findPatientDetailByAdmissionId(admissionId));
    }
    ////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////검색 관련////////////////////////////////////////////
    // 검색페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    public List<ERViewVO> searchByPatientNameId(String patientNameId){
        return convertToVOList(erViewRepo.allSearchByPatientNameId(patientNameId));
    }
    /////////////////////////////////////////////////////////////////////////////////////

}
