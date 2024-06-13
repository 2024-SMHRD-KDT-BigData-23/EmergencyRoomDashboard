package com.smhrd.namnam.repository;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.vo.StaffInfoVO;
import lombok.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffInfoRepository extends JpaRepository<StaffInfo, String> {
    long countByStaffStatus(String status);

    StaffInfo findByStaffId(String staffId);

    ////////////////////////////// role 페이지 //////////////////////////////////////////////

    // role페이지 user 수정
    @Modifying
    @Query(value = "UPDATE staff_info " +
            "SET staff_id = :staffId, " +
            "    staff_name = :staffName, " +
            "    staff_role = :staffRole, " +
            "    staff_pw = CASE WHEN :staffPw <> '' THEN :staffPw ELSE staff_pw END " +
            "WHERE staff_id = :id",
            nativeQuery = true)
    void editStaffInfo(@Param("id") String id, @Param("staffName") String staffName,
                                  @Param("staffRole") String staffRole, @Param("staffId") String staffId, @Param("staffPw") String staffPw);

    // role페이지 user 삭제
    @Modifying
    @Query(value = "DELETE FROM staff_info " +
            "WHERE staff_id = :id",
            nativeQuery = true)
    void deleteByIdd(@Param("id") String id);


    // role페이지 user 추가
    @Modifying
    @Query(value = "INSERT INTO staff_info (hospital_id, staff_id, staff_name, staff_role, staff_status, staff_pw) " +
            "VALUES (1, :staffId, :staffName, :staffRole, 'inactive', :staffPw)",
            nativeQuery = true)
    void AddStaffInfo(@Param("staffName") String staffName, @Param("staffRole") String staffRole,
                      @Param("staffId") String staffId, @Param("staffPw") String staffPw);
}
