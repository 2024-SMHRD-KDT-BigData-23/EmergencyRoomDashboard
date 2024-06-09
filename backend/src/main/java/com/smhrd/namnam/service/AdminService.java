package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.ERView;
import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.repository.AdmissionInfoRepository;
import com.smhrd.namnam.repository.ERViewRepository;
import com.smhrd.namnam.repository.StaffInfoRepository;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.ERViewVO;
import com.smhrd.namnam.vo.StaffInfoVO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private ERViewRepository erViewRepo;
    @Autowired
    private AdmissionInfoRepository admissionInfoRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private StaffInfoRepository staffInfoRepo;
    @Autowired
    private JavaMailSender mailSender;



    // entity list 형태 -> vo list형태로 변환 메서드
    private List<ERViewVO> convertToAdmissionListViewVOList(List<ERView> admissionListView) {
        return admissionListView.stream().map(entity -> modelMapper.map(entity, ERViewVO.class))
                .collect(Collectors.toList());
    }

    // AdmissionListViewVO entity 형태 -> vo 형태로 변환 메서드
    private ERViewVO convertToAdmissionListViewVO(ERView admissionListView){
        return modelMapper.map(admissionListView, ERViewVO.class);
    }

    // AdmissionInfoVO entity list 형태 -> vo list형태로 변환 메서드
    private List<AdmissionInfoVO> convertToAdmissionInfoVOList(List<AdmissionInfo> admissionInfo){
        return admissionInfo.stream().map(entity -> modelMapper.map(entity, AdmissionInfoVO.class))
                .collect(Collectors.toList());
    }

    // StaffInfoVO entity list 형태 -> vo list형태로 변환 메서드
    private List<StaffInfoVO> convertToStaffInfoVOList(List<StaffInfo> staffInfo){
        return staffInfo.stream().map(entity -> modelMapper.map(entity, StaffInfoVO.class))
                .collect(Collectors.toList());
    }



    //////////////////////////////////////result_ward log 페이지///////////////////////
    // result_ward가 결정된 admission_id 전체 리스트(최신순)
//    public List<AdmissionInfoVO> findResultWardLog() {
//        return convertToAdmissionInfoVOList(admissionInfoRepo.findByAdmissionResultWardIsNotNullOrderByAdmissionOutTimeDesc());
//    }

    // log페이지 검색기능(staff_id, result_ward, 날짜)
    public List<AdmissionInfoVO> searchResultWardLog(String staffId, String resultWard, String outTimeStart, String outTimeEnd) {
        return convertToAdmissionInfoVOList(admissionInfoRepo.searchResultWardLog(staffId, resultWard, outTimeStart, outTimeEnd));
    }

    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////검색관련/////////////////////////////////////////////////
    // staff들 리스트
    public List<StaffInfoVO> findStaffInfo() {
        return convertToStaffInfoVOList(staffInfoRepo.findAll());
    }
    ////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////help 페이지////////////////////
    public void sendEmail(String issueType, String description, String contactInfo) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("dlwlgnsrhy@gmail.com"); // 받는 이메일 주소
        message.setSubject("지원 티켓 제출: " + issueType);
        message.setText("설명: " + description + "\n연락처 정보: " + contactInfo);

        mailSender.send(message);
    }

}
