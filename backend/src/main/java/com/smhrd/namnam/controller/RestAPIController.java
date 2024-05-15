package com.smhrd.namnam.controller;

import com.smhrd.namnam.domain.Member;
import com.smhrd.namnam.service.MemberService;
import com.smhrd.namnam.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/namnam/member")
public class RestAPIController {

    @Autowired
    private final MemberService memberService;

    public RestAPIController(MemberService memberService) {
        this.memberService = memberService;
    }

//    @ApiOperation(value = "전체 회원 조회", notes = "전체 회원을 조회한다.")
    @GetMapping("/list")
    public List<Member> memberList() {
        return memberService.findMembers();
    }

//    @ApiOperation(value = "특정 회원 조회", notes = "특정 회원을 조회한다.")
    @GetMapping("/list/{id}")
    public Optional<Member> memberListOne(@PathVariable Long id) {
        return memberService.findOne(id);
    }

//    @ApiOperation(value = "회원 등록", notes = "회원을 등록한다.")
    @PostMapping("/insert")
    public Long memberInsert(@RequestBody MemberVO vo) {
        return memberService.join(new Member(vo));
    }

//    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정한다.")
    @PutMapping("/update/{id}")
    public Long memberUpdate(@PathVariable Long id, @RequestBody MemberVO vo) {
        return memberService.join(new Member(id, vo.getName(), vo.getEmail(), vo.getPassword()));
    }

//    @ApiOperation(value = "회원 삭제", notes = "회원을 삭제한다.")
    @DeleteMapping("/delete/{id}")
    public String memberDelete(@PathVariable Long id) {
        return memberService.deleteOne(id);
    }
}
