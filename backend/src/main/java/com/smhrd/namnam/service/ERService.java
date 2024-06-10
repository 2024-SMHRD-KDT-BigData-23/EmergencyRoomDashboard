package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.CommentInfo;
import com.smhrd.namnam.entity.ERView;
import com.smhrd.namnam.entity.ResultWardInfo;
import com.smhrd.namnam.repository.*;
import com.smhrd.namnam.vo.CommentInfoVO;
import com.smhrd.namnam.vo.ERViewVO;
import com.smhrd.namnam.vo.ResultWardInfoVO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ERService {

    @Autowired
    private ERViewRepository erViewRepo;

    @Autowired
    private AdmissionInfoRepository admissionRepo;

    @Autowired
    private ResultWardInfoRepository resultWardRepo;

    @Autowired
    private CommentInfoRepository commentRepo;

    @Autowired
    private StaffInfoRepository staffRepo;

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
    public List<ERViewVO> findPatients(String pageStatus, String bedward, String deepNcdss, String patientNameId) {
        return convertToVOList(erViewRepo.findMedicalPatients(pageStatus, bedward, deepNcdss, patientNameId));
    }

    // result_ward 결정 유무
    public ResultWardInfo findResultWards(String admissionId) {
        return resultWardRepo.findTopByAdmissionInfoOrderByResultWardUpdatedAtDesc(admissionRepo.findByAdmissionId(admissionId));
    }

    // 진료 후 result_ward 결정
    public ResultWardInfoVO saveResultWard(String staffId, String admissionId, ResultWardInfoVO vo) {
        ResultWardInfo entity = new ResultWardInfo(staffRepo.findByStaffId(staffId), admissionRepo.findByAdmissionId(admissionId), vo);
        ResultWardInfo savedEntity = resultWardRepo.save(entity);
        return new ResultWardInfoVO(savedEntity);
    }

    // 환자 comment 작성
    public CommentInfoVO saveComment(String staffId, String admissionId, CommentInfoVO vo) {
        CommentInfo entity = new CommentInfo(staffRepo.findByStaffId(staffId), admissionRepo.findByAdmissionId(admissionId), vo);
        CommentInfo savedEntity = commentRepo.save(entity);
        return new CommentInfoVO(savedEntity);
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
