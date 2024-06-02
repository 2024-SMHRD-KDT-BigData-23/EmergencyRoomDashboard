package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.jwt.JWTUtil;
import com.smhrd.namnam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody StaffInfo staffInfo) {
        Optional<StaffInfo> foundUser = userService.findById(staffInfo.getStaffId());
        if (foundUser.isPresent() && foundUser.get().getStaffPw().equals(staffInfo.getStaffPw())) {
            String token = jwtUtil.createJwt(foundUser.get().getStaffId(), "ROLE_USER", 60 * 60 * 1000L);
            return ResponseEntity.ok().header("Authorization", "Bearer " + token).body("Login Successful");
        } else {
            return ResponseEntity.status(401).body("Login Failed");
        }
    }
}
