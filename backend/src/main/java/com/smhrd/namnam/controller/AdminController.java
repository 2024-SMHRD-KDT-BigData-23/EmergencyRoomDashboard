package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.entity.UserActivity;
import com.smhrd.namnam.service.AdminService;
import com.smhrd.namnam.vo.*;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    ////////////////////////////////admin log 페이지/////////////////////////////

    // admin log 리스트(login로그, resultWard로그 최신순
    @GetMapping("/log")
    @Operation(summary = "(admin log 리스트(login로그, resultWard로그 최신순)")
    public List<LogViewVO> findLogInfo() {
        return adminService.findLogInfo();
    }

    // admin log 검색(staff_id, action, 날짜)
    @GetMapping("/log/search")
    @Operation(summary = "(admin log 검색(staff_id, action, 날짜))")
    public List<LogViewVO> searchLogInfo(@RequestParam(value = "logUser") String logUser,
                                         @RequestParam(value = "logAction") String logAction,
                                         @RequestParam(value = "logTimeStart") String logTimeStart,
                                         @RequestParam(value = "logTimeEnd") String logTimeEnd){
        return adminService.searchlogInfo(logUser, logAction, logTimeStart, logTimeEnd);
    }



    ////////////////////////admin help 페이지//////////////////////////////
    @PostMapping("/sendEmail")
    @Operation(summary = "(email 전송 시)")
    public String sendEmail(@RequestBody Map<String, String> ticket) {
        String issueType = ticket.get("issueType");
        String description = ticket.get("description");
        String contactInfo = ticket.get("contactInfo");
        adminService.sendEmail(issueType, description, contactInfo);
        return "Email sent successfully";
    }

    ///////////////////////////////role 페이지////////////////////////////////////
    // staff들 리스트
    @GetMapping("/staff")
    @Operation(summary = "(role페이지 staff 리스트)")
    public List<RoleViewVO> findStaffInfo(){
        return adminService.findStaffInfo();
    }


    // role페이지 user 수정
    @PutMapping("/role/edit/{id}")
    @Operation(summary = "(role페이지 user 수정)")
    public ResponseEntity<Void> editStaffInfo(@PathVariable("id") String id,@RequestBody StaffInfoVO staffInfoVO){
        adminService.editStaffInfo(id, staffInfoVO.getStaffName(), staffInfoVO.getStaffRole(),
                staffInfoVO.getStaffId(), staffInfoVO.getStaffPw());
        return ResponseEntity.ok().build();
    }

    // role페이지 user 삭제
    @DeleteMapping("/role/delete/{id}")
    @Operation(summary = "(role페이지 user 삭제)")
    public ResponseEntity<Void> deleteStaffInfo(@PathVariable("id") String id){
        adminService.deleteStaffInfo(id);
        return ResponseEntity.ok().build();
    }

    // role페이지 user 추가
    @PostMapping("/role/add")
    @Operation(summary = "(role페이지 user 추가)")
    public ResponseEntity<Void> addStaffInfo(@RequestBody StaffInfoVO staffInfoVO){
        adminService.addStaffInfo(staffInfoVO.getStaffName(), staffInfoVO.getStaffRole(),
                staffInfoVO.getStaffId(), staffInfoVO.getStaffPw());
        return ResponseEntity.ok().build();
    }
    //////////////////////////////admin reportpage/////////////////////////////
    @GetMapping("/pdf/generate")
    public ResponseEntity<byte[]>generatePdf(@RequestParam String reportType,
                                             @RequestParam String startDate,
                                             @RequestParam String endDate){
        byte[] pdfContents = adminService.generatePdf(reportType,startDate,endDate);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment","report.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfContents);
    // role 페이지 search
    @GetMapping("/role/search")
    @Operation(summary = "(role 페이지 search)")
    public List<RoleViewVO> searchStaffInfo(@RequestParam(value = "staffId") String staffId, @RequestParam(value = "staffRole") String staffRole,
                                            @RequestParam(value = "staffStatus") String staffStatus){
        return adminService.searchStaffInfo(staffId, staffRole, staffStatus);
    }


    }
    }

