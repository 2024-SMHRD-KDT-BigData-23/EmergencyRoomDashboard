package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.service.AdmissionListService;
import com.smhrd.namnam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {


    @Autowired
    private UserService userService;

    @PostMapping("/")
    public String login(@RequestBody StaffInfo staffInfo) {
        // 로그인 로직 구현
        Optional<StaffInfo> foundUser = userService.findById(staffInfo.getStaffId());
        if (foundUser != null && foundUser.get().getStaffPw().equals(staffInfo.getStaffPw())) {
            return "Login Successful";
        } else {
            return "Login Failed";
        }
    }

    @Autowired
    private AdmissionListService admissionListService;

//    @GetMapping("/admissionList")
//    public Optional<AdmissionListView> getAdmissionDetails(@PathVariable Long admissionId) {
//        return admissionListService.getAdmissionList(admissionId);
//    }


}
