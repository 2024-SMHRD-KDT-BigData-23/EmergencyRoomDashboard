package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.entity.UserActivity;
import com.smhrd.namnam.jwt.JWTUtil;
import com.smhrd.namnam.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
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
            System.out.println("Generated Token: " + token); // 디버그를 위해 추가
            return ResponseEntity.ok().header("Authorization", "Bearer " + token).body("Login Successful");
        } else {
            return ResponseEntity.status(401).body("Login Failed");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        System.out.println("Received Authorization Header: " + authHeader); // 디버그를 위해 추가

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("Received Token for Logout: " + token); // 디버그를 위해 추가

            if (jwtUtil.validateToken(token)) {
                jwtUtil.invalidateToken(token);
                System.out.println("Token invalidated successfully");
                return ResponseEntity.ok("Logout Successful");
            } else {
                System.out.println("Invalid Token");
                return ResponseEntity.status(401).body("Invalid Token");
            }
        } else {
            System.out.println("Authorization header not found or doesn't start with Bearer");
            return ResponseEntity.status(401).body("Logout Failed");
        }
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
    @GetMapping("/user-activity")
    public ResponseEntity<List<UserActivity>> getUserActivity() {
        List<UserActivity> activities = userService.getUserActivityForLastWeek();
        return ResponseEntity.ok(activities);
    }

}
