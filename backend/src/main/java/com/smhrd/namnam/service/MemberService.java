package com.smhrd.namnam.service;

import com.smhrd.namnam.domain.Member;
import com.smhrd.namnam.repository.MemberRepository;
import com.smhrd.namnam.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private final MemberRepository repo;

    public MemberService(MemberRepository repo) {
        this.repo = repo;
    }

    // 회원 가입
    public Long join(Member member) {
        repo.save(member);
        return member.getId();
    }

    // 전체 회원 조회
    public List<Member> findMembers() {
        return repo.findAll();
    }

    // 한 회원 조회
    public Optional<Member> findOne(Long memberId) {
        return repo.findById(memberId);
    }

    // 한 회원 삭제
    public String deleteOne(Long memberId) {
        try {
            repo.deleteById(memberId);
            return "삭제 성공";
        } catch (Exception e) {
            System.out.println(e);
            return "삭제 실패";
        }
    }

}
