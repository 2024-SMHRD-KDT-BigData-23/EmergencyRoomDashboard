package com.smhrd.namnam.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffInfoVO {

    // 의료진 아이디
    private String staffId;
    // 비밀번호
    private String staffPw;
    // 직위
    private String staffRole;
    // HospitalInfo의 병원 식별자
    private Long hospitalId;

}
