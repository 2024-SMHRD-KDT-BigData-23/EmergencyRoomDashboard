package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.entity.UserActivity;
import com.smhrd.namnam.jwt.JWTUtil;
import com.smhrd.namnam.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class


UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody StaffInfo staffInfo) {
        Optional<StaffInfo> foundUser = userService.findById(staffInfo.getStaffId());
        if (foundUser.isPresent() && foundUser.get().getStaffPw().equals(staffInfo.getStaffPw())) {
            String token = jwtUtil.createJwt(foundUser.get().getStaffId(), "ROLE_USER", 60 * 60 * 1000L);
            userService.updateStatus(staffInfo.getStaffId(), "active");
            return ResponseEntity.ok().header("Authorization", "Bearer " + token).body("Login Successful");
        } else {
            return ResponseEntity.status(401).body("Login Failed");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String staffId) {
        userService.updateStatus(staffId, "inactive");
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/users/count")
    public ResponseEntity<Integer> getTotalUsers() {
        int count = userService.getTotalUsers();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/users/active")
    public ResponseEntity<Integer> getActiveUsers() {
        int count = userService.getActiveUsers();
        return ResponseEntity.ok(count);
    }

}
