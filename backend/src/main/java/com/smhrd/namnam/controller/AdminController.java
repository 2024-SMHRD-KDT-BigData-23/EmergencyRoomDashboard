package com.smhrd.namnam.controller;

import com.smhrd.namnam.service.AdminService;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.AdmissionListViewVO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Repository
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin")
    public String adminP(){
        return  "admin Controller";

    }

    ////////////////////////////////admin log 페이지/////////////////////////////
    // result_ward가 결정된 admission_id 전체 리스트(최신순)
    @GetMapping("/resultWardLog")
    @Operation(summary = "(result_ward가 결정정된 admission_id 전체 리스트)")
    public List<AdmissionInfoVO> findResultWardLog(){
        return adminService.findResultWardLog();
    }
    ////////////////////////////////////////////////////////////////////////////

    }

