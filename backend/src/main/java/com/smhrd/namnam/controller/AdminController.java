package com.smhrd.namnam.controller;

import com.smhrd.namnam.service.AdminService;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
    @Operation(summary = "(log페이지 result_ward가 결정정된 admission_id 전체 리스트)")
    public List<AdmissionInfoVO> findResultWardLog(){
        return adminService.findResultWardLog();
    }

    // search 기능
    @GetMapping("/search")
    @Operation(summary = "(log페이지 검색기능(staff_id, result_ward, 날짜)")
    public List<AdmissionInfoVO> searchResultWardLog(@RequestParam String staffId,
                                                     @RequestParam String ResultWard,
                                                     @RequestParam String OutTimeStart,
                                                     @RequestParam String OutTimeEnd){
        return adminService.searchResultWardLog(staffId, ResultWard, OutTimeStart, OutTimeEnd);
    }


    ////////////////////////////////////////////////////////////////////////////

    }

