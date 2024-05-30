package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.repository.StaffInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private StaffInfoRepository staffInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        StaffInfo staffInfo = staffInfoRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new org.springframework.security.core.userdetails.User(staffInfo.getStaffId(), staffInfo.getStaffPw(), new ArrayList<>());
    }
}
