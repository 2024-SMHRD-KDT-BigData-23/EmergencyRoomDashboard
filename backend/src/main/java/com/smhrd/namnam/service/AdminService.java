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

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private AdmissionListViewRepository admissionViewRepo;
    @Autowired
    private AdmissionInfoRepository admissionInfoRepo;
    @Autowired
    private ModelMapper modelMapper;


    // entity list 형태 -> vo list형태로 변환 메서드
    private List<AdmissionListViewVO> convertToAdmissionListViewVOList(List<AdmissionListView> admissionListView) {
        return admissionListView.stream().map(entity -> modelMapper.map(entity, AdmissionListViewVO.class))
                .collect(Collectors.toList());
    }

    // AdmissionListViewVO entity 형태 -> vo 형태로 변환 메서드
    private AdmissionListViewVO convertToAdmissionListViewVO(AdmissionListView admissionListView){
        return modelMapper.map(admissionListView, AdmissionListViewVO.class);
    }

    // AdmissionInfoVO entity list 형태 -> vo list형태로 변환 메서드
    private List<AdmissionInfoVO> convertToAdmissionInfoVOList(List<AdmissionInfo> admissionInfo){
        return admissionInfo.stream().map(entity -> modelMapper.map(entity, AdmissionInfoVO.class))
                .collect(Collectors.toList());
    }



    //////////////////////////////////////result_ward log 페이지///////////////////////
    // result_ward가 결정된 admission_id 전체 리스트(최신순)
    public List<AdmissionInfoVO> findResultWardLog() {
        return convertToAdmissionInfoVOList(admissionInfoRepo.findByAdmissionResultWardIsNotNullOrderByAdmissionOutTimeDesc());
    }
    //////////////////////////////////////////////////////////////////////////////////
}
