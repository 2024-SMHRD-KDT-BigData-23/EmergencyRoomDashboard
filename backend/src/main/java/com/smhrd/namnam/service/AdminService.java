package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.*;
import com.smhrd.namnam.repository.*;
import com.smhrd.namnam.vo.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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
    @Autowired
    private ResultWardInfoRepository resultWardRepo;
    @Autowired
    private UserActivityRepository userActivityRepo;
    @Autowired
    private LogViewRepository logViewRepo;
    @Autowired
    private RoleViewRepository roleViewRepo;



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
    // StaffInfoVO entity 형태 -> vo 형태로 변환 메서드
    private StaffInfoVO convertToStaffOneVO(StaffInfo staffInfo){
        return modelMapper.map(staffInfo, StaffInfoVO.class);
    }

    // ResultWardInfoVO entity list 형태 -> vo list형태로 변환 메서드
    private List<ResultWardInfoVO> converToResultWardInfoVOList(List<ResultWardInfo> resultWardInfo){
        return resultWardInfo.stream().map(entity -> modelMapper.map(entity, ResultWardInfoVO.class))
                .collect(Collectors.toList());
    }

    // UserActivityVO entity list 형태 -> vo list형태로 변환 메서드
    private List<UserActivityVO> converToUserActivityVOList(List<UserActivity> userActivity){
        return userActivity.stream().map(entity -> modelMapper.map(entity, UserActivityVO.class))
                .collect(Collectors.toList());
    }

    // LogViewVO entity list 형태 -> vo list형태로 변환 메서드
    private List<LogViewVO> converToLogViewVOList(List<LogView> logView){
        return logView.stream().map(entity -> modelMapper.map(entity, LogViewVO.class))
                .collect(Collectors.toList());
    }

    // RoleViewVO entity list 형태 -> vo list형태로 변환 메서드
    private List<RoleViewVO> converToRoleViewVOList(List<RoleView> roleView){
        return roleView.stream().map(entity -> modelMapper.map(entity, RoleViewVO.class))
                .collect(Collectors.toList());
    }



    //////////////////////////////////////result_ward log 페이지///////////////////////

    // admin log 리스트(login로그, resultWard로그 최신순
    public List<LogViewVO> findLogInfo() {
        return converToLogViewVOList(logViewRepo.findAllOrderByLogTimeDesc());
    }

    // admin log 검색(staff_id, action, 날짜)
    public List<LogViewVO> searchlogInfo(String logUser, String logAction, String logTimeStart, String logTimeEnd) {
        return converToLogViewVOList(logViewRepo.searchlogInfo(logUser, logAction, logTimeStart, logTimeEnd));
    }



    //////////////////////////////////role 페이지/////////////////////////////////////////////////
    // staff들 리스트
    public List<RoleViewVO> findStaffInfo() {
        return converToRoleViewVOList(roleViewRepo.findAll());
    }

    // role페이지 user 수정
    @Transactional
    public void  editStaffInfo(String id, String staffName, String staffRole, String staffId, String staffPw) {
        staffInfoRepo.editStaffInfo(id, staffName, staffRole, staffId, staffPw);
    }

    // role페이지 user 삭제
    @Transactional
    public void deleteStaffInfo(String id) {
        staffInfoRepo.deleteByIdd(id);
    }

    // role페이지 user 추가
    @Transactional
    public void addStaffInfo(String staffName, String staffRole, String staffId, String staffPw) {
        staffInfoRepo.AddStaffInfo(staffName, staffRole, staffId, staffPw);
    }

    // role 페이지 search
    public List<RoleViewVO> searchStaffInfo(String staffId, String staffRole, String staffStatus) {
        return converToRoleViewVOList(roleViewRepo.searchStaffInfo(staffId, staffRole, staffStatus));
    }




    ///////////////////////////////////////help 페이지////////////////////
    public void sendEmail(String issueType, String description, String contactInfo) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("dlwlgnsrhy@gmail.com"); // 받는 이메일 주소
        message.setSubject("지원 티켓 제출: " + issueType);
        message.setText("설명: " + description + "\n연락처 정보: " + contactInfo);

        mailSender.send(message);
    }
}
