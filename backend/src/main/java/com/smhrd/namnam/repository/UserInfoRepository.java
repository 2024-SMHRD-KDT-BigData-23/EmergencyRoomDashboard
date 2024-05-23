package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, String> {
    UserInfo findUserInfoByUserId(String id);
}
