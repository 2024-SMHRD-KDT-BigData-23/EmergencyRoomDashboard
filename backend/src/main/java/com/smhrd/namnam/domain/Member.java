package com.smhrd.namnam.domain;

import com.smhrd.namnam.vo.MemberVO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String password;

    public Member(MemberVO vo) {
        this.name = vo.getName();
        this.email = vo.getEmail();
        this.password = vo.getPassword();
    }
}
