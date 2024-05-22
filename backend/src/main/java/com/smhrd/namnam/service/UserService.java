package com.smhrd.namnam.service;

import com.smhrd.namnam.entity.User;
import com.smhrd.namnam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        // Spring Security가 제거되었으므로 password encoding을 하지 않습니다.
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
