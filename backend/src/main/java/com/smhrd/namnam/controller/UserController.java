package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody StaffInfo staffInfo) {
        Optional<StaffInfo> foundUser = userService.findById(staffInfo.getStaffId());
        if (foundUser.isPresent() && foundUser.get().getStaffPw().equals(staffInfo.getStaffPw())) {
            return "Login Successful";
        } else {
            return "Login Failed";
        }
    }
}
