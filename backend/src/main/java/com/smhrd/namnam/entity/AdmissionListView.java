package com.smhrd.namnam.entity;

import com.smhrd.namnam.vo.AdmissionListViewVO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Immutable
@Subselect("SELECT \n" +
        "    ROW_NUMBER() OVER () AS id,\n" +
        "    ai.admission_id,\n" +
        "    ai.admission_in_time,\n" +
        "    ai.admission_out_time,\n" +
        "    ai.admission_result_ward,\n" +
        "    pi.patient_id,\n" +
        "    pi.patient_name, \n" +
        "    pi.patient_sex, \n" +
        "    pi.patient_birthdate,\n" +
        "    pi.patient_disease_history,\n" +
        "    bi.bed_ward, \n" +
        "    pvi.patient_vital_created_at,\n" +
        "    pvi.patient_vital_temperature, \n" +
        "    pvi.patient_vital_hr, \n" +
        "    pvi.patient_vital_respiratory_rate, \n" +
        "    pvi.patient_vital_spo2, \n" +
        "    pvi.patient_vital_nibp_s, \n" +
        "    pvi.patient_vital_nibp_d,\n" +
        "    pvi.patient_vital_acuity,\n" +
        "    pvi.patient_vital_pain,\n" +
        "    pvi.patient_vital_chief_complaint,\n" +
        "    di.deep_ncdss\n" +
        "FROM \n" +
        "    admission_info ai\n" +
        "JOIN \n" +
        "    patient_info pi ON ai.patient_id = pi.patient_id\n" +
        "JOIN \n" +
        "    patient_vital_info pvi ON ai.admission_id = pvi.admission_id\n" +
        "JOIN \n" +
        "    map_info mi ON ai.admission_id = mi.admission_id\n" +
        "JOIN \n" +
        "    bed_info bi ON mi.bed_id = bi.bed_id\n" +
        "JOIN \n" +
        "    deep_info di ON pvi.patient_vital_id = di.patient_vital_id")
public class AdmissionListView {

    // 뷰의 식별자
    @Id
    @Column(name = "id")
    private Long id;

    // 입원 식별자
    @Column(name = "admission_id")
    private String admissionId;

    // 등록 일자
    @Column(name = "admission_created_at")
    private Timestamp admissionCreatedAt;

    // 도착 시간
    @Column(name = "admission_in_time")
    private Timestamp admissionInTime;

    // 퇴원 시간
    @Column(name = "admission_out_time")
    private Timestamp admissionOutTime;

    // 실제 배치 결과
    @Column(name = "admission_result_ward")
    private String admissionResultWard;

    // 환자 식별자
    @Column(name = "patient_id")
    private String patientId;

    // 환자 이름
    @Column(name = "patient_name")
    private String patientName;

    // 성별
    @Column(name = "patient_sex")
    private String patientSex;

    // 생년월일
    @Column(name = "patient_birthdate")
    private java.sql.Date patientBirthdate;

    // 과거 병력
    @Column(name = "patient_disease_history")
    private String patientDiseaseHistory;

    // 구역
    @Column(name = "bed_ward")
    private String bedWard;

    // 등록 일자
    @Column(name = "patient_vital_created_at")
    private Timestamp patientVitalCreatedAt;

    // 체온
    @Column(name = "patient_vital_temperature")
    private BigDecimal patientVitalTemperature;

    // 심박수
    @Column(name = "patient_vital_hr")
    private int patientVitalHr;

    // 호흡수
    @Column(name = "patient_vital_respiratory_rate")
    private int patientVitalRespiratoryRate;

    // 산소포화도
    @Column(name = "patient_vital_spo2")
    private BigDecimal patientVitalSpo2;

    // 수축혈압
    @Column(name = "patient_vital_nibp_s")
    private int patientVitalNibpS;

    // 이완혈압
    @Column(name = "patient_vital_nibp_d")
    private int patientVitalNibpD;

    // 통증수준
    @Column(name = "patient_vital_pain")
    private int patientVitalPain;

    // 주요증상
    @Column(name = "patient_vital_chief_complaint")
    private String patientVitalChiefComplaint;

    // mimic데이터의 acuity컬럼 값
    @Column(name = "patient_vital_acuity")
    private int patientVitalAcuity;

    // 위험도
    @Column(name = "deep_ncdss")
    private String deepNcdss;


//    public static AdmissionListViewVO toVo(AdmissionListView admissionListView) {
//
//        AdmissionListViewVO vo = new AdmissionListViewVO();
//
//
//
//        return vo;
//
//    }
}