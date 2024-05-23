package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, String> {
    // Optional
    // -> CrudRepository에서 이미 정의된 findById(ID) 메소드와 충돌을 방지
    UserInfo findUserInfoByUserId(String id);
}
