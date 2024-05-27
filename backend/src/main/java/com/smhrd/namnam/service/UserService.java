package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.repository.StaffInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private StaffInfoRepository userRepository;

    public StaffInfo save(StaffInfo staffId) {
        // Spring Security가 제거되었으므로 password encoding을 하지 않습니다.
        return userRepository.save(staffId);
    }

    public Optional<StaffInfo> findById(String staffId) {
        return userRepository.findById(staffId);
    }

}
