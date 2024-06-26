package com.smhrd.namnam.service;

import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.smhrd.namnam.entity.*;
import com.smhrd.namnam.repository.*;
import com.smhrd.namnam.vo.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.itextpdf.layout.element.Table;
import com.smhrd.namnam.entity.LogView;
import com.smhrd.namnam.entity.ERView;
import com.smhrd.namnam.entity.RoleView;
import com.smhrd.namnam.repository.LogViewRepository;
import com.smhrd.namnam.repository.ERViewRepository;
import com.smhrd.namnam.repository.RoleViewRepository;

import java.io.ByteArrayOutputStream;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
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
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



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
    public void  editStaffInfo(String id, String staffRole, String staffPw) {
        staffInfoRepo.editStaffInfo(id, staffRole, bCryptPasswordEncoder.encode(staffPw));
    }

    // role페이지 user 권한해제
    @Transactional
    public void unuseableStaffInfo(String id) {
        StaffInfo staffInfo = staffInfoRepo.findByStaffId(id);
        staffInfo.setStaffAuthority("unusable");
        staffInfoRepo.save(staffInfo);
    }

    // role페이지 user 권한부여
    @Transactional
    public void restoreStaffInfo(String id) {
        StaffInfo staffInfo = staffInfoRepo.findByStaffId(id);
        staffInfo.setStaffAuthority("usable");
        staffInfoRepo.save(staffInfo);
    }

    // role페이지 user 추가
    @Transactional
    public void addStaffInfo(String staffName, String staffRole, String staffId, String staffPw) {

        // 비밀번호 인코딩
        String encodedPassword = bCryptPasswordEncoder.encode(staffPw);

        // 현재 로컬 날짜와 시간
        LocalDateTime now = LocalDateTime.now();
        // String 형태로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedNow = now.format(formatter);

        staffInfoRepo.AddStaffInfo(staffName, staffRole, staffId, encodedPassword, formattedNow);
    }

    // role 페이지 search
    public List<RoleViewVO> searchStaffInfo(String staffId, String staffRole, String staffStatus) {
        return converToRoleViewVOList(roleViewRepo.searchStaffInfo(staffId, staffRole, staffStatus));
    }


    ////////////////////help 페이지////////////////
    // 페이지 submit ticket
    public void sendEmail(String issueType, String description, String contactInfo) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("dlwlgnsrhy@gmail.com"); // 받는 이메일 주소
        message.setSubject("지원 티켓 제출: " + issueType);
        message.setText("설명: " + description + "\n연락처 정보: " + contactInfo);
        mailSender.send(message);
    }
    ///////////////// report 페이지/////////////////////
    public byte[] generatePdf(String reportType, String startDate, String endDate) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        // Custom page size (e.g., A3 landscape)
        pdf.setDefaultPageSize(PageSize.A3.rotate());
        Document document = new Document(pdf);
        document.add(new Paragraph("Hospital Report"));

        if ("userActivity".equals(reportType)) {
            addLogViewData(document);
        } else if ("systemUsage".equals(reportType)) {
            addRoleViewData(document);
        } else if ("patientCare".equals(reportType)) {
            addERViewData(document);
        }
        document.close();
        return baos.toByteArray();
    }

    private void addLogViewData(Document document) {
        List<LogView> logViews = logViewRepo.findAll();
        document.add(new Paragraph("Log Information"));
        float[] columnWidths = new float[5];  // Assuming there are 19 columns
        Arrays.fill(columnWidths, 1);  // Set each column width to 1 (equal width)
        Table table = new Table(columnWidths);
        table.addCell("Log Id");
        table.addCell("Log Time");
        table.addCell("Log Action");
        table.addCell("Log User");
        table.addCell("Log Detail");
        for (LogView log : logViews) {
            table.addCell(log.getLogId().toString());
            table.addCell(log.getLogTime().toString());
            table.addCell(log.getLogAction());
            table.addCell(log.getLogUser()!= null ? log.getLogUser() : "N/A");
            table.addCell(log.getLogDetail());
        }
        document.add(table);
    }

    private void addRoleViewData(Document document) {
        List<RoleView> roleViews = roleViewRepo.findAll();
        document.add(new Paragraph("Role Information"));
        float[] columnWidths = new float[8];  // Assuming there are 19 columns
        Arrays.fill(columnWidths, 1);  // Set each column width to 1 (equal width)
        Table table = new Table(columnWidths);
        table.addCell("Role View ID");
        table.addCell("Hospital ID");
        table.addCell("Staff Created At");
        table.addCell("Staff ID");
        table.addCell("Staff Name");
        table.addCell("Staff Role");
        table.addCell("Staff Status");
        table.addCell("Activity Date");
        for (RoleView role : roleViews) {
            table.addCell(role.getRoleViewId().toString());
            table.addCell(role.getHospitalId().toString());
            table.addCell(role.getStaffCreatedAt().toString());
            table.addCell(role.getStaffId());
            table.addCell(role.getStaffName());
            table.addCell(role.getStaffRole());
            table.addCell(role.getStaffStatus());
            table.addCell(role.getActivityDate() != null ? role.getActivityDate().toString() : "N/A");
        }
        document.add(table);
    }

    private void addERViewData(Document document) {
        List<ERView> erViews = erViewRepo.findAll();
        document.add(new Paragraph("ER Information"));
        float[] columnWidths = new float[18];  // Assuming there are 19 columns
        Arrays.fill(columnWidths, 1);  // Set each column width to 1 (equal width)
        Table table = new Table(columnWidths);
        table.addCell("ER View ID");
        table.addCell("Patient ID");
        table.addCell("Patient Name");
        table.addCell("Patient Sex");
        table.addCell("Patient Age");
        table.addCell("Patient Disease History");
        table.addCell("Bed Ward");
        table.addCell("Admission ID");
        table.addCell("Admission In Time");
        table.addCell("Admission Out Time");
        table.addCell("Admission Acuity");
        table.addCell("Admission Pain");
        table.addCell("Admission Chief Complaint");
        table.addCell("Staff ID");
        table.addCell("Deep NCDSS");
        table.addCell("Deep Home Percent");
        table.addCell("Deep ICU Percent");
        table.addCell("Deep Ward Percent");
        for (ERView er : erViews) {
            table.addCell(er.getViewId().toString());
            table.addCell(er.getPatientId());
            table.addCell(er.getPatientName());
            table.addCell(er.getPatientSex());
            table.addCell(String.valueOf(er.getPatientAge()));
            table.addCell(er.getPatientDiseaseHistory());
            table.addCell(er.getBedWard());
            table.addCell(er.getAdmissionId());
            table.addCell(er.getAdmissionInTime().toString());
            table.addCell(er.getAdmissionOutTime() != null ? er.getAdmissionOutTime().toString() : "N/A");
            table.addCell(String.valueOf(er.getAdmissionAcuity()));
            table.addCell(String.valueOf(er.getAdmissionPain()));
            table.addCell(er.getAdmissionChiefComplaint());
            table.addCell(er.getStaffId());
            table.addCell(er.getDeepNcdss()!=null? er.getDeepNcdss():"N/A");
            table.addCell(er.getDeepHomePercent()!=null? er.getDeepHomePercent().toString():"N/A");
            table.addCell(er.getDeepIcuPercent()!=null? er.getDeepIcuPercent().toString():"N/A");
            table.addCell(er.getDeepWardPercent()!=null? er.getDeepWardPercent().toString():"N/A");
        }
        document.add(table);
    }

}
