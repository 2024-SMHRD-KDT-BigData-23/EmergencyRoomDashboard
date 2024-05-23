package com.smhrd.namnam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "user_info")
@Data
public class UserInfo {

    @Id
    @Column(name = "user_id", nullable = false, length = 20)
    private String userId;

    @Column(name = "user_pw", nullable = false, length = 255)
    private String userPw;

    @Column(name = "role", nullable = false, length = 30)
    private String role;

    @Column(name = "hospital_id", nullable = false, length = 20)
    private String hospitalId;
}
