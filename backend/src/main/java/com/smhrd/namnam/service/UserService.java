package com.smhrd.namnam.service;

// import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.entity.StaffInfo;
// import com.smhrd.namnam.repository.AdmissionListViewRepository;
import com.smhrd.namnam.entity.UserActivity;
import com.smhrd.namnam.repository.StaffInfoRepository;
import com.smhrd.namnam.repository.UserActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private StaffInfoRepository userRepository;
    @Autowired
    private UserActivityRepository userActivityRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    public StaffInfo save(StaffInfo staffId) {
        return userRepository.save(staffId);
    }

    public Optional<StaffInfo> findById(String staffId) {
        return userRepository.findById(staffId);
    }
    // 비밀번호 비교 메소드 추가
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return bCryptPasswordEncoder.matches(rawPassword, encodedPassword);
    }
    //admin-dashboard
    public int getTotalUsers(){
        return (int) userRepository.count();
    }
    public int getActiveUsers() {
        return (int) userRepository.countByStaffStatus("active");
    }
    public void updateStatus(String staffId, String status) {
        Optional<StaffInfo> user = userRepository.findById(staffId);
        if (user.isPresent()) {
            StaffInfo staffInfo = user.get();
            staffInfo.setStaffStatus(status);
            userRepository.save(staffInfo);

            //활동 기록 추가
            UserActivity activity = new UserActivity();
            activity.setStaffInfo(staffInfo);
            activity.setActivityDate(LocalDateTime.now());
            activity.setActivityType(status.equals("active") ? "login" : "logout");
            userActivityRepository.save(activity);
        }
    }

    public List<UserActivity> getUserActivityForLastWeek(){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime weekAgo= now.minusDays(7);
        return userActivityRepository.findByActivityDateBetween(weekAgo,now);
    }
}

