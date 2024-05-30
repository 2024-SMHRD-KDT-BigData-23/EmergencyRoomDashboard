package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.AdmissionListView;
import com.smhrd.namnam.service.ERService;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.AdmissionListViewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ER")
public class ERController {

    @Autowired
    private ERService erService;

    //////////////////////////////////////////현재 페이지/////////////////////////////////////////
    // 응급실 진료 중인 환자들 전체 조회(각 입원코드마다 가장최신) //
    @GetMapping("/medical-patients")
    public List<AdmissionListViewVO> findMedicalPatients() {
        return erService.findMedicalPatients();
    }


    // 응급실 진료 중인 환자들 중 bed_ward 검색(각 입원코드마다 가장최신) //
    @GetMapping("/search-ward/medical-patients/{ward}")
    public List<AdmissionListViewVO> findMedicalPatientsByWard(@PathVariable("ward") String ward) {
        return erService.findMedicalPatientsByWard(ward);
    }

    // 응급실 진료 중인 환자들 중 ncdss 검색(각 입원코드마다 가장최신)
    @GetMapping("/search-ncdss/medical-patients/{ncdss}")
    public List<AdmissionListViewVO> findMedicalPatientsByDeepNcdss(@PathVariable("ncdss") String ncdss) {
        return erService.findMedicalPatientsByDeepNcdss(ncdss);
    }

    // 응급실 진료 후 result_ward 수정
    @PatchMapping("/set/medical-patients/{admissionId}")
    public ResponseEntity<AdmissionInfo> saveMedicalPatientsByAdmissionId(@PathVariable("admissionId") String admissionId, @RequestBody AdmissionInfoVO vo) {
        try {
            vo.setAdmissionId(admissionId);
            return new ResponseEntity<>(erService.saveMedicalPatientsByAdmissionId(vo), HttpStatus.OK);
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////




    /////////////////////////////////////////과거 페이지/////////////////////////////////////////
    // 과거 응급실 진료 환자들 전체 조회(각 입원코드마다 가장최신)
    @GetMapping("/past-patients")
    public List<AdmissionListViewVO> findPastPatients() {
        return erService.findPastPatients();
    }

    // 과거 응급실 진료 환자들 중 bed_ward 검색(각 입원코드마다 가장최신)
    @GetMapping("/search-ward/past-patients/{ward}")
    public List<AdmissionListViewVO> findPastPatientsByWard(@PathVariable("ward") String ward){
        return erService.findPastPatientsByWard(ward);
    }

    // 과거 응급실 진료 환자들 중 ncdss 검색(각 입원코드마다 가장 최신)
    @GetMapping("/search-ncdss/past-patients/{ncdss}")
    public List<AdmissionListViewVO> findPastPatientsByDeepNcdss(@PathVariable("ncdss") String ncdss) {
        return erService.findPastPatientsByDeepNcdss(ncdss);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////





    /////////////////////////////////////상세 페이지///////////////////////////////////////
    // 특정 입원코드에 대한 상세 정보
    @GetMapping("/patient-details/{admissionId}")
    public List<AdmissionListViewVO> findPatientDetailsByAdmissionId(@PathVariable("admissionId") String admissionId){
        return erService.findPatientDetailsByAdmissionId(admissionId);
    }
    ///////////////////////////////////////////////////////////////////////////////////////







    //////////////////////////////////검색관련/////////////////////////////////////////////////
    // 검색페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @GetMapping("/search/patient-name-id/{patientNameId}")
    public List<AdmissionListViewVO> searchByPatientNameId(@PathVariable("patientNameId") String patientNameId){
        return erService.searchByPatientNameId(patientNameId);
    }

    // 현재 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @GetMapping("/now_search/patient-name-id/{patientNameId}")
    public List<AdmissionListViewVO> nowSearchByPatientNameId(@PathVariable("patientNameId") String patientNameId){
        return erService.nowSearchByPatientNameId(patientNameId);
    }

    // 과거 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @GetMapping("/past_search/patient-name-id/{patientNameId}")
    public List<AdmissionListViewVO> pastSearchByPatientNameId(@PathVariable("patientNameId") String patientNameId){
        return erService.pastSearchByPatientNameId(patientNameId);
    }
    //////////////////////////////////////////////////////////////////////////////////////////


}




