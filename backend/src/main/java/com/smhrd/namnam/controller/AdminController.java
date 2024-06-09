package com.smhrd.namnam.controller;

import com.smhrd.namnam.service.AdminService;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.StaffInfoVO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/admin")
    @Operation(summary = "(admin계정 로그인 시)")
    public String adminP(){
        return  "admin Controller";

    }

    ////////////////////////////////admin log 페이지/////////////////////////////
    // result_ward가 결정된 admission_id 전체 리스트(최신순)
//    @GetMapping("/resultWardLog")
//    @Operation(summary = "(log페이지 result_ward가 결정정된 admission_id 전체 리스트)")
//    public List<AdmissionInfoVO> findResultWardLog(){
//        return adminService.findResultWardLog();
//    }

    // log페이지 검색기능(staff_id, result_ward, 날짜)
    @GetMapping("/search")
    @Operation(summary = "(log페이지 검색기능(staff_id, result_ward, 날짜)")
    public List<AdmissionInfoVO> searchResultWardLog(@RequestParam(value = "staffId") String staffId,
                                                     @RequestParam(value = "ResultWard") String ResultWard,
                                                     @RequestParam(value = "OutTimeStart") String OutTimeStart,
                                                     @RequestParam(value = "OutTimeEnd") String OutTimeEnd){
        return adminService.searchResultWardLog(staffId, ResultWard, OutTimeStart, OutTimeEnd);
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
    @Operation(summary = "(staff들 리스트)")
    public List<StaffInfoVO> findStaffInfo(){
        return adminService.findStaffInfo();
    }

    // staff_info 수정
//    @GetMapping()

    ////////////////////////////////////////////////////////////////////////////
    }

