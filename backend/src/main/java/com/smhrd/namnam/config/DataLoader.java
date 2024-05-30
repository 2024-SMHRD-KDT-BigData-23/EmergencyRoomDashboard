package com.smhrd.namnam.config;

import com.smhrd.namnam.entity.*;
import com.smhrd.namnam.repository.*;
import net.datafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
public class DataLoader {

    private static final Logger log = LoggerFactory.getLogger(DataLoader.class);
    private final HospitalInfoRepository hospitalRepo;
    private final StaffInfoRepository staffRepo;
    private final PatientInfoRepository patientRepo;
    private final AdmissionInfoRepository admissionRepo;
    private final PatientVitalInfoRepository patientVitalRepo;
    private final DeepInfoRepository deepRepo;
    private final BedInfoRepository bedRepo;
    private final MapInfoRepository mapRepo;
    private final Faker faker = new Faker();
    private final Random random = new Random();

    public DataLoader(HospitalInfoRepository hospitalRepo, StaffInfoRepository staffRepo, PatientInfoRepository patientRepo, AdmissionInfoRepository admissionRepo, PatientVitalInfoRepository patientVitalRepo, DeepInfoRepository deepRepo, MapInfoRepository mapRepo, BedInfoRepository bedRepo) {
        this.hospitalRepo = hospitalRepo;
        this.staffRepo = staffRepo;
        this.patientRepo = patientRepo;
        this.admissionRepo = admissionRepo;
        this.patientVitalRepo = patientVitalRepo;
        this.deepRepo = deepRepo;
        this.bedRepo = bedRepo;
        this.mapRepo = mapRepo;
    }

    // 스프링 실행 시 더미 데이터 생성해주는 메소드
    public String generateData() {
        try {
            hospitalGenerator();
            staffGenerator();
            patientGenerator();
            admissionGenerator();
            patientVitalGenerator();
            deepGenerator();
            bedGenerator();
            mapGenerator();
            return "더미 데이터 생성 성공!";
        } catch (Exception e) {
            System.out.println(e);
            return "더미 데이터 생성 실패..";
        }
    }

    // 병원 생성 메소드
    public void hospitalGenerator() {
        HospitalInfo hospital = new HospitalInfo();

        hospital.setHospitalName("스마트병원");
        hospital.setHospitalTel("010-qwer-1234");
        hospital.setHospitalAddr("광주광역시 남구 송암동 cgi센터");
        hospital.setHospitalBedCnt(30);

        hospitalRepo.save(hospital);
    }

    // 병원별 의료진 생성 메소드
    public void staffGenerator() {
        List<HospitalInfo> allHospitals = hospitalRepo.findAll();

        for (HospitalInfo selectedHospital : allHospitals) {
            for (int i = 0; i < 2; i++) {
                StaffInfo staff = new StaffInfo();

                if (i == 0) {
                    staff.setHospitalInfo(selectedHospital);
                    staff.setStaffId("staff");
                    staff.setStaffPw("staff");
                    staff.setStaffRole("staff");
                } else {
                    staff.setHospitalInfo(selectedHospital);
                    staff.setStaffId("admin");
                    staff.setStaffPw("admin");
                    staff.setStaffRole("admin");
                }

                staffRepo.save(staff);
            }
        }
    }

    // 의료진별 환자 생성 메소드
    public void patientGenerator() {
        List<StaffInfo> allStaffs = staffRepo.findAll();
        LocalDateTime startTime = LocalDateTime.now();

        for (StaffInfo selectedStaff : allStaffs) {
            if (selectedStaff.getStaffRole().equals("staff")) {
                for (int i = 1; i <= 10; i++) {
                    PatientInfo patient = new PatientInfo();

                    // 환자 식별자(PK)
                    patient.setPatientId(faker.regexify("[a-zA-Z0-9]{10}"));
                    // 의료진 식별자(FK)
                    patient.setStaffInfo(selectedStaff);
                    // 환자 이름
                    patient.setPatientName(faker.name().fullName());
                    // 환자 성별
                    patient.setPatientSex(faker.options().option("남", "여"));
                    // 환자 생년월일
                    patient.setPatientBirthdate(new Date(faker.date().birthday().getTime()));
                    // 환자 과거이력
                    patient.setPatientDiseaseHistory(faker.lorem().paragraph());

                    patientRepo.save(patient);
                }
            }
        }
    }

    // 환자별 입실번호 생성 메소드
    public void admissionGenerator() {
        List<PatientInfo> allPatients = patientRepo.findAll();
        LocalDateTime startTime = LocalDateTime.now();

        for (PatientInfo selectedPatient : allPatients) {
            for (int i = 1; i <= 2; i++) {
                AdmissionInfo admission = new AdmissionInfo();

                // 입실 식별자(PK)
                admission.setAdmissionId(faker.regexify("[a-zA-Z0-9]{10}"));
                // 환자 식별자(FK)
                admission.setPatientInfo(selectedPatient);
                // 입실 시간
                admission.setAdmissionInTime(Timestamp.valueOf(startTime.minusDays(random.nextInt(30))));
                // 퇴실 시간
                // admission.setAdmissionOutTime(startTime.minusDays(random.nextInt(30)));
                // 입실 상태(Y or N)
                admission.setAdmissionState("Y");
                // 의료진이 실제 배치한 위치(home, ward, icu)
                // admission.setAdmissionResultWard();

                admissionRepo.save(admission);
            }
        }
    }

    // 입실번호별 생체정보 생성 메소드
    public void patientVitalGenerator() {
        List<AdmissionInfo> allAdmissions = admissionRepo.findAll();
        LocalDateTime startTime = LocalDateTime.now();

        for (AdmissionInfo selectedAdmission : allAdmissions) { // admission_id(입실 식별자) 선택
            for (int i = 1; i <= 10; i++) { // admission_id(입실 식별자)당 환자 바이탈 수 생성
                PatientVitalInfo patientVital = new PatientVitalInfo();

                // admission_id(입실 식별자, FK)
                patientVital.setAdmissionInfo(selectedAdmission);
                // 환자 성별
                // patientVital.setPatientVitalSex(faker.options().option("남", "여"));
                // 체온(°C)
                patientVital.setPatientVitalTemperature(BigDecimal.valueOf(faker.number().randomDouble(1, 36, 38)));
                // 심박수(bpm)
                patientVital.setPatientVitalHr(faker.number().numberBetween(50, 110)); // 표준 범위 ± 오차 범위
                // 호흡수(min)
                patientVital.setPatientVitalRespiratoryRate(faker.number().numberBetween(10, 22)); // 표준 범위 ± 오차 범위
                // 산소포화도(%%)
                patientVital.setPatientVitalSpo2(BigDecimal.valueOf(faker.number().randomDouble(1, 93, 102))); // 표준 범위 ± 오차 범위
                // 수축혈압(mmHg)
                patientVital.setPatientVitalNibpS(faker.number().numberBetween(80, 130)); // 표준 범위 ± 오차 범위
                // 이완혈압(mmHg)
                patientVital.setPatientVitalNibpD(faker.number().numberBetween(50, 90)); // 표준 범위 ± 오차 범위
                // 고통 정도
                patientVital.setPatientVitalPain(faker.number().numberBetween(1, 10));
                // 호소 증상
                patientVital.setPatientVitalChiefComplaint(faker.lorem().sentence());
                // 위험도
                patientVital.setPatientVitalAcuity(faker.number().numberBetween(1, 5));
                // 바이탈을 잰 시간
                LocalDateTime createAt = startTime.plusMinutes(10L * i);
                patientVital.setPatientVitalCreatedAt(Timestamp.valueOf(createAt));

                patientVitalRepo.save(patientVital);
            }
        }
    }

    // 바이탈별 위험도
    public void deepGenerator() {
        List<PatientVitalInfo> allPatientVitals = patientVitalRepo.findAll();
        LocalDateTime startTime = LocalDateTime.now();

        for(PatientVitalInfo selectedPatientVital : allPatientVitals) {
            DeepInfo deep = new DeepInfo();

            // 환자의 바이탈 식별자(FK)
            deep.setPatientVitalInfo(selectedPatientVital);
            // 프로젝트 모델이 제공하는 위험도
            // deep.setDeepNcdss();

            deepRepo.save(deep);
        }
    }

    // 병원에 있는 병상 정보
    public void bedGenerator() {
        for(int i = 1; i <= 10; i++) {
            BedInfo bed = new BedInfo();

            bed.setBedMap("스마트병원배치도");
            bed.setBedNum(i);
            bed.setBedWard("일반구역A");

            bedRepo.save(bed);
        }
        for(int i = 11; i <= 20; i++) {
            BedInfo bed = new BedInfo();

            bed.setBedMap("스마트병원배치도");
            bed.setBedNum(i);
            bed.setBedWard("일반구역B");

            bedRepo.save(bed);
        }
        for(int i = 21; i <= 30; i++) {
            BedInfo bed = new BedInfo();

            bed.setBedMap("스마트병원배치도");
            bed.setBedNum(i);
            bed.setBedWard("중증구역");

            bedRepo.save(bed);
        }
    }

    // 입실한 환자별 위치
    public void mapGenerator() {
        List<AdmissionInfo> allAdmissions = admissionRepo.findAll();
        List<BedInfo> allBeds = bedRepo.findAll();

        for(AdmissionInfo selectedAdmission : allAdmissions) {
            MapInfo map = new MapInfo();

            map.setBedInfo(allBeds.get(random.nextInt(1, 30)));
            map.setAdmissionInfo(selectedAdmission);

            mapRepo.save(map);
        }
    }

}
