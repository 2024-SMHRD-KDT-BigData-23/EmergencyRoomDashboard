package com.smhrd.namnam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Repository
public class AdminController {

    @GetMapping("/admin")
    public String adminP(){
        return  "admin Controller";

    }
}
