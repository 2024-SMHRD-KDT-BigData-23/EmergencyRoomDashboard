package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.UserInfo;
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
    public String login(@RequestBody UserInfo userInfo) {
        // 로그인 로직 구현
        Optional<UserInfo> foundUser = userService.findById(userInfo.getUserId());
        if (foundUser != null && foundUser.get().getUserPw().equals(userInfo.getUserPw())) {
            return "Login Successful";
        } else {
            return "Login Failed";
        }
    }

}
