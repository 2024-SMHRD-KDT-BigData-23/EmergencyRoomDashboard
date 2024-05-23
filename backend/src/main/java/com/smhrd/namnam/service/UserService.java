package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.UserInfo;
import com.smhrd.namnam.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserInfoRepository userRepository;

    public UserInfo save(UserInfo userInfo) {
        // Spring Security가 제거되었으므로 password encoding을 하지 않습니다.
        return userRepository.save(userInfo);
    }

    public Optional<UserInfo> findById(String userId) {
        return userRepository.findById(userId);
    }


}
