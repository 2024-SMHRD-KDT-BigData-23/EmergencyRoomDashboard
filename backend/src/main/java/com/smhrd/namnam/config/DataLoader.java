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
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
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
    public void generateData() {
        hospitalGenerator();
        staffGenerator();
        patientGenerator();
        admissionGenerator();
        patientVitalGenerator();
        deepGenerator();
        bedGenerator();
        mapGenerator();
    }

    // 병원 생성 메소드
    public void hospitalGenerator() {
        HospitalInfo hospital = new HospitalInfo();

        // 병원 이름
        hospital.setHospitalName("스마트병원");
        // 병원 전화번호
        hospital.setHospitalTel("010-qwer-1234");
        // 병원 주소
        hospital.setHospitalAddr("광주광역시 남구 송암동 cgi센터");
        // 병원 침상의 수
        hospital.setHospitalBedCnt(30);

        hospitalRepo.save(hospital);
    }

    // 병원별 의료진 생성 메소드
    public void staffGenerator() {
        List<HospitalInfo> allHospitals = hospitalRepo.findAll();

        for (HospitalInfo selectedHospital : allHospitals) {
            for (int i = 0; i < 2; i++) {
                StaffInfo staff = new StaffInfo();

                if (i == 0) { // i가 0일 때, staff 생성
                    staff.setHospitalInfo(selectedHospital);
                    staff.setStaffId("staff");
                    staff.setStaffPw("staff");
                    staff.setStaffRole("staff");
                } else { // i가 1일 때, admin 생성
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

        for (StaffInfo selectedStaff : allStaffs) {
            if (selectedStaff.getStaffRole().equals("staff")) { // role이 staff일 때만 환자 정보 입력
                for (int i = 1; i <= 30; i++) {
                    PatientInfo patient = new PatientInfo();

                    // 의료진 식별자(FK)
                    patient.setStaffInfo(selectedStaff);
                    // 환자 이름
                    patient.setPatientName(faker.name().fullName());
                    // 환자 성별
                    String sex = faker.options().option("남", "여");
                    patient.setPatientSex(sex);
                    // 환자 식별자(PK)
                    patient.setPatientId(String.format("%s-%04d-%04d", sex, faker.number().randomNumber(4, true), faker.number().randomNumber(4, true)));
                    // 환자 생년월일
                    Date birthdate = new Date(faker.date().birthday().getTime());
                    patient.setPatientBirthdate(birthdate);
                    // 환자 나이
                    Calendar birth = Calendar.getInstance();
                    birth.setTime(birthdate);
                    Calendar today = Calendar.getInstance();
                    int age = today.get(Calendar.YEAR) - birth.get(Calendar.YEAR);
                    if(today.get(Calendar.DAY_OF_YEAR) < birth.get(Calendar.DAY_OF_YEAR)) {
                        age--;
                    }
                    patient.setPatientAge(age);
                    // 환자 과거이력
                    patient.setPatientDiseaseHistory(faker.lorem().paragraph());

                    patientRepo.save(patient);
                }
            }
        }
    }

    // 환자별 입실정보 생성 메소드
    public void admissionGenerator() {
        List<PatientInfo> allPatients = patientRepo.findAll();
        LocalDateTime startTime = LocalDateTime.now();

        for (PatientInfo selectedPatient : allPatients) {
            for (int i = 1; i <= random.nextInt(4) + 1; i++) {
                AdmissionInfo admission = new AdmissionInfo();

                // 무작위 날짜 추출 과정
                LocalDateTime randomDate = startTime.minusDays(random.nextInt(30));
                Timestamp randomTimestamp = Timestamp.valueOf(randomDate);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
                String formattedDate = formatter.format(randomTimestamp.toLocalDateTime());

                // 무작위 시간 생성 (0시부터 23시까지, 분과 초도 무작위로)
                int randomHour = random.nextInt(24);
                int randomMinute = random.nextInt(60);
                int randomSecond = random.nextInt(60);
                LocalDateTime randomDateTime = randomDate.withHour(randomHour).withMinute(randomMinute).withSecond(randomSecond);

                // 입실 식별자(PK)
                admission.setAdmissionId(String.format("AID-%s-%04d", formattedDate, faker.number().randomNumber(4, true)));
                // 환자 식별자(FK)
                admission.setPatientInfo(selectedPatient);
                // 입실 시간
                admission.setAdmissionInTime(Timestamp.valueOf(randomDateTime));
                // 도착 수단
                admission.setAdmissionArrivalTransport(faker.options().option("WALK IN", "AMBULANCE"));

                admissionRepo.save(admission);
            }
        }
    }

    // 입실번호별 생체정보 생성 메소드
    public void patientVitalGenerator() {
        List<AdmissionInfo> allAdmissions = admissionRepo.findAll();

        for (AdmissionInfo selectedAdmission : allAdmissions) { // admission_id(입실 식별자) 선택
            for (int i = 1; i <= random.nextInt(18) + 1; i++) { // admission_id(입실 식별자)당 환자 바이탈 수 생성
                PatientVitalInfo currentPatientVital = patientVitalRepo.findTopByAdmissionInfoOrderByPatientVitalCreatedAtDesc(selectedAdmission);

                PatientVitalInfo presentPatientVital = new PatientVitalInfo();

                // admission_id(입실 식별자, FK)
                presentPatientVital.setAdmissionInfo(selectedAdmission);
                // 체온(°C)
                presentPatientVital.setPatientVitalTemperature(BigDecimal.valueOf(faker.number().randomDouble(1, 36, 38)));
                // 심박수(bpm)
                presentPatientVital.setPatientVitalHr(faker.number().numberBetween(50, 110)); // 표준 범위 ± 오차 범위
                // 호흡수(min)
                presentPatientVital.setPatientVitalRespiratoryRate(faker.number().numberBetween(10, 22)); // 표준 범위 ± 오차 범위
                // 산소포화도(%%)
                presentPatientVital.setPatientVitalSpo2(BigDecimal.valueOf(faker.number().randomDouble(1, 93, 102))); // 표준 범위 ± 오차 범위
                // 수축혈압(mmHg)
                presentPatientVital.setPatientVitalNibpS(faker.number().numberBetween(80, 130)); // 표준 범위 ± 오차 범위
                // 이완혈압(mmHg)
                presentPatientVital.setPatientVitalNibpD(faker.number().numberBetween(50, 90)); // 표준 범위 ± 오차 범위

                if (currentPatientVital != null) {
                    // 고통 정도
                    presentPatientVital.setPatientVitalPain(currentPatientVital.getPatientVitalPain());
                    // 호소 증상
                    presentPatientVital.setPatientVitalChiefComplaint(currentPatientVital.getPatientVitalChiefComplaint());
                    // 위험도
                    presentPatientVital.setPatientVitalAcuity(currentPatientVital.getPatientVitalAcuity());
                    // 바이탈을 잰 시간
                    LocalDateTime vitalCreatedAt = currentPatientVital.getPatientVitalCreatedAt().toLocalDateTime();
                    vitalCreatedAt = vitalCreatedAt.plusMinutes(30L);
                    presentPatientVital.setPatientVitalCreatedAt(Timestamp.valueOf(vitalCreatedAt));
                } else {
                    // 고통 정도
                    presentPatientVital.setPatientVitalPain(faker.number().numberBetween(1, 10));
                    // 호소 증상
                    presentPatientVital.setPatientVitalChiefComplaint(faker.lorem().sentence());
                    // 위험도
                    presentPatientVital.setPatientVitalAcuity(faker.number().numberBetween(1, 5));
                    // 바이탈을 잰 시간
                    Timestamp admissionInTime = selectedAdmission.getAdmissionInTime();
                    LocalDateTime vitalCreatedAt = admissionInTime.toLocalDateTime();
                    presentPatientVital.setPatientVitalCreatedAt(Timestamp.valueOf(vitalCreatedAt.plusMinutes(30L)));
                }

                patientVitalRepo.save(presentPatientVital);
            }
        }
    }

    // 바이탈별 위험도
    public void deepGenerator() {
        List<PatientVitalInfo> allPatientVitals = patientVitalRepo.findAll();
        LocalDateTime startTime = LocalDateTime.now();

        for (PatientVitalInfo selectedPatientVital : allPatientVitals) {
            DeepInfo deep = new DeepInfo();

            // 환자의 바이탈 식별자(FK)
            deep.setPatientVitalInfo(selectedPatientVital);

            deepRepo.save(deep);
        }
    }

    // 병원에 있는 병상 정보
    public void bedGenerator() {
        for (int i = 1; i <= 10; i++) {
            BedInfo bed = new BedInfo();

            bed.setBedMap("스마트병원배치도");
            bed.setBedNum(i);
            bed.setBedWard("일반구역A");

            bedRepo.save(bed);
        }
        for (int i = 11; i <= 20; i++) {
            BedInfo bed = new BedInfo();

            bed.setBedMap("스마트병원배치도");
            bed.setBedNum(i);
            bed.setBedWard("일반구역B");

            bedRepo.save(bed);
        }
        for (int i = 21; i <= 30; i++) {
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

        for (AdmissionInfo selectedAdmission : allAdmissions) {
            MapInfo map = new MapInfo();

            map.setBedInfo(allBeds.get(random.nextInt(1, 30)));
            map.setAdmissionInfo(selectedAdmission);

            mapRepo.save(map);
        }
    }

}
