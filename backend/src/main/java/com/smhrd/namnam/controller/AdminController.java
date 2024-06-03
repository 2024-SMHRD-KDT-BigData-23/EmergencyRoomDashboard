package com.smhrd.namnam.controller;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Repository
@RequestMapping("/api")
public class AdminController {

    @GetMapping("/admin")
    public String adminP(){
        return  "admin Controller";

    }
}
