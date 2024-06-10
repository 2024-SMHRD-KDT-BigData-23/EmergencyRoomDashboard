package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.UserActivity;
import com.smhrd.namnam.service.AdminService;
import com.smhrd.namnam.vo.*;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/admin")
    @Operation(summary = "(admin계정 로그인 시)")
    public String adminP(){
        return  "admin Controller";

    }

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
    @Operation(summary = "(staff들 리스트)")
    public List<StaffInfoVO> findStaffInfo(){

        System.out.println("1번 : "+adminService.findStaffInfo().get(1).getStaffId());
        System.out.println("2번 : "+adminService.findStaffInfo().get(1).getActivity_date());
        return adminService.findStaffInfo();
    }


    ////////////////////////////////////////////////////////////////////////////
    }

