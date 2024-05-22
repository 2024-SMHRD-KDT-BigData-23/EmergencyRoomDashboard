package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.User;
import com.smhrd.namnam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public String login(@RequestBody User user) {
        // 로그인 로직 구현
        User foundUser = userService.findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return "Login Successful";
        } else {
            return "Login Failed";
        }
    }
}
