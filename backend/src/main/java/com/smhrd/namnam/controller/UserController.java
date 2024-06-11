package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.entity.UserActivity;
import com.smhrd.namnam.jwt.JWTUtil;
import com.smhrd.namnam.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
            userService.updateStatus(staffInfo.getStaffId(), "active");
            return ResponseEntity.ok().header("Authorization", "Bearer " + token).body("Login Successful");
        } else {
            return ResponseEntity.status(401).body("Login Failed");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authorization, @RequestParam("staffId") String staffId) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(400).body("Invalid token");
        }
        String token = authorization.split(" ")[1];
        userService.updateStatus(staffId, "inactive");
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/users/count")
    @Operation(summary = "(dashboardpage 단일 표기)")
    public ResponseEntity<Integer> getTotalUsers() {
        int count = userService.getTotalUsers();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/users/active")
    @Operation(summary = "(수정중)")
    public ResponseEntity<Integer> getActiveUsers() {
        int count = userService.getActiveUsers();
        return ResponseEntity.ok(count);
    }
    @GetMapping("/user-activity")
    @Operation(summary = "(dashboardpage 누적 표기)")
    public ResponseEntity<List<UserActivity>> getUserActivity() {
        List<UserActivity> activities = userService.getUserActivityForLastWeek();
        return ResponseEntity.ok(activities);
    }

}
