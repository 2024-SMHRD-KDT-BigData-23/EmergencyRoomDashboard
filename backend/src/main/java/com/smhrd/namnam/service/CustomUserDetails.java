package com.smhrd.namnam.service;


import com.smhrd.namnam.entity.StaffInfo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private StaffInfo staffInfo;

    public CustomUserDetails(StaffInfo staffInfo) {
        this.staffInfo = staffInfo;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 필요한 경우 권한 설정
        return null;
    }

    @Override
    public String getPassword() {
        return staffInfo.getStaffPw();
    }

    @Override
    public String getUsername() {
        return staffInfo.getStaffId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

