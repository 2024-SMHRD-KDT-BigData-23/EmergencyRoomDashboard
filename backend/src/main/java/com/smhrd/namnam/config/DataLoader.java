package com.smhrd.namnam.config;

import com.smhrd.namnam.entity.*;
import com.smhrd.namnam.repository.*;
import com.smhrd.namnam.service.ERService;
import net.datafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.Array;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
    private final ResultWardInfoRepository resultWardRepo;
    private final CommentInfoRepository commentRepo;
    private final BedInfoRepository bedRepo;
    private final MapInfoRepository mapRepo;
    private final Faker faker = new Faker();
    private final Random random = new Random();

    public DataLoader(HospitalInfoRepository hospitalRepo, StaffInfoRepository staffRepo, PatientInfoRepository patientRepo, AdmissionInfoRepository admissionRepo, PatientVitalInfoRepository patientVitalRepo, DeepInfoRepository deepRepo, ResultWardInfoRepository resultWardRepo, CommentInfoRepository commentRepo, MapInfoRepository mapRepo, BedInfoRepository bedRepo) {
        this.hospitalRepo = hospitalRepo;
        this.staffRepo = staffRepo;
        this.patientRepo = patientRepo;
        this.admissionRepo = admissionRepo;
        this.patientVitalRepo = patientVitalRepo;
        this.deepRepo = deepRepo;
        this.resultWardRepo = resultWardRepo;
        this.commentRepo = commentRepo;
        this.bedRepo = bedRepo;
        this.mapRepo = mapRepo;
    }

    // 퇴실 더미 데이터 생성 메소드 (ddl-auto : create, patient_vital_created_at : off, result_ward_updated_at : off, comment_updated_at : off)
    public void ExGenerateData() {
        hospitalGenerator();
        staffGenerator();
        patientGenerator();
        admissionGenerator();
        patientVitalGenerator();
        deepGenerator();
        resultWardGenerator();
        commentGenerator();
        bedGenerator();
        mapGenerator();
    }

    // 입실 더미 데이터 생성 메소드 (ddl-auto : update, patient_vital_created_at : off, result_ward_updated_at : on, comment_updated_at : off)
    public void InGenerateData() {
        List<HospitalInfo> allHospitals = hospitalRepo.findAll();
        for(HospitalInfo selectedHospital : allHospitals) {
//            for(int i = 0; i < 30; i++) {
            PatientInfo patient = new PatientInfo();
            patient.setHospitalInfo(selectedHospital);
            String sex = faker.options().option("Male", "Female");
            patient.setPatientSex(sex);
            String name = sex.equals("Male") ? faker.name().malefirstName() : faker.name().femaleFirstName();
            patient.setPatientName(name);
            Date birthdate = new Date(faker.date().birthday().getTime());
            patient.setPatientBirthdate(birthdate);
            SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
            patient.setPatientId(String.format("%s-%s", name.substring(0, 1).toUpperCase(), sdf.format(birthdate)));
            Calendar birth = Calendar.getInstance();
            birth.setTime(birthdate);
            Calendar today = Calendar.getInstance();
            int age = today.get(Calendar.YEAR) - birth.get(Calendar.YEAR);
            if (today.get(Calendar.DAY_OF_YEAR) < birth.get(Calendar.DAY_OF_YEAR)) {
                age--;
            }
            patient.setPatientAge(age);
            StringBuilder diseaseHistory = new StringBuilder();
            for (int j = 0; j < random.nextInt(4); j++) {
                diseaseHistory.append(faker.options().option(faker.disease().internalDisease(), faker.disease().dermatology(), faker.disease().gynecologyAndObstetrics(), faker.disease().ophthalmologyAndOtorhinolaryngology(), faker.disease().neurology(), faker.disease().surgery()));
            }
            patient.setPatientDiseaseHistory(diseaseHistory.toString());
            // ---------------------------------------------------
            LocalDateTime startTime = LocalDateTime.now();
            AdmissionInfo admission = new AdmissionInfo();
            LocalDateTime randomDate = startTime.minusDays(random.nextInt(30));
            Timestamp randomTimestamp = Timestamp.valueOf(randomDate);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            String formattedDate = formatter.format(randomTimestamp.toLocalDateTime());
            String arrivalTransport = faker.options().option("WALK IN", "AMBULANCE");
            admission.setAdmissionArrivalTransport(arrivalTransport);
            admission.setAdmissionId(String.format("%s-%s-%s", arrivalTransport.equals("WALK IN") ? "W" : "A", formattedDate, "00" + faker.number().randomNumber(2, true)));
            admission.setPatientInfo(patient);
            admission.setStaffInfo(randomStaff(staffRepo.findAll()));
            Random random = new Random();
            // 입실 시간 수정할거면 여기!!! (입실 시간에 따라서 현재시간까지 바이탈 재는 것이 가능해짐!)
            long maxHours = 5;
            long randomHours = random.nextLong(maxHours) + 2;
            LocalDateTime randomDataTime = startTime.minusHours(randomHours);
            admission.setAdmissionInTime(Timestamp.from(randomDataTime.atZone(ZoneId.systemDefault()).toInstant()));
            admission.setAdmissionPain(faker.number().numberBetween(0, 10));
            admission.setAdmissionChiefComplaint(faker.lorem().sentence());
            admission.setAdmissionAcuity(faker.number().numberBetween(1, 5));
            // ----------------------------------------------------------------------
            List<PatientVitalInfo> presentPatientVitals = new ArrayList<>();
            PatientVitalInfo presentPatientVital = new PatientVitalInfo();
            presentPatientVital.setAdmissionInfo(admission);
            Timestamp admissionInTime = admission.getAdmissionInTime();
            LocalDateTime vitalCreatedAt = admissionInTime.toLocalDateTime();
            Random ran = new Random();
            while (vitalCreatedAt.isBefore(LocalDateTime.now())) {
                presentPatientVital.setPatientVitalTemperature(BigDecimal.valueOf(faker.number().randomDouble(1, 36, 39) - 0.5));
                presentPatientVital.setPatientVitalHr(faker.number().numberBetween(55, 125));
                presentPatientVital.setPatientVitalRespiratoryRate(faker.number().numberBetween(13, 30));
                presentPatientVital.setPatientVitalSpo2(BigDecimal.valueOf(faker.options().option(faker.number().randomDouble(1, 91, 96), faker.number().randomDouble(1, 97, 100))));
                presentPatientVital.setPatientVitalNibpS(faker.number().numberBetween(85, 175));
                presentPatientVital.setPatientVitalNibpD(faker.number().numberBetween(35, 115));
                int minutesOffset = 30 + (ran.nextInt(25) - 12);
                int secondsOffset = ran.nextInt(60);
                vitalCreatedAt = vitalCreatedAt.plusMinutes(minutesOffset).plusSeconds(secondsOffset);
                presentPatientVital.setPatientVitalCreatedAt(Timestamp.valueOf(vitalCreatedAt));
                presentPatientVitals.add(presentPatientVital);
                presentPatientVital = new PatientVitalInfo();
                presentPatientVital.setAdmissionInfo(admission);
            }
            // ----------------------------------------------------------------------
            List<DeepInfo> deeps = new ArrayList<>();
            for (PatientVitalInfo patientVital : presentPatientVitals) {
                DeepInfo deep = new DeepInfo();
                deep.setPatientVitalInfo(patientVital);
                deeps.add(deep);
            }
            // ----------------------------------------------------------------------
            CommentInfo comment = new CommentInfo();
            comment.setStaffInfo(randomStaff(staffRepo.findAll()));
            comment.setAdmissionInfo(admission);
            comment.setComment(faker.options().option(faker.disease().internalDisease(), faker.disease().dermatology(), faker.disease().gynecologyAndObstetrics(), faker.disease().ophthalmologyAndOtorhinolaryngology(), faker.disease().neurology(), faker.disease().surgery()));
            comment.setCommentUpdatedAt(randomVital(presentPatientVitals).getPatientVitalCreatedAt());
            // -----------------------------------------------------------------------
            MapInfo map = new MapInfo();
            map.setAdmissionInfo(admission);
            if (admission.getAdmissionAcuity() < 3) {
                map.setBedInfo(bedRepo.findByBedNum(random.nextInt(10) + 21));
            } else if (admission.getAdmissionAcuity() < 5) {
                map.setBedInfo(bedRepo.findByBedNum(random.nextInt(1, 21)));
            }
            // ------------------------------------------------------------------------
            patientRepo.save(patient);
            admissionRepo.save(admission);
            patientVitalRepo.saveAll(presentPatientVitals);
            deepRepo.saveAll(deeps);
            commentRepo.save(comment);
            mapRepo.save(map);
//        }
        }
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

        String[] roles = {"Attending Physician", "Resident Physician", "Fellow", "Emergency Medicine Specialist", "Consulting Physician", "Registered Nurse", "Emergency Room Nurse", "Nurse Practitioner", "Clinical Nurse Specialist", "Charge Nurse", "admin"};

        for(HospitalInfo selectedHospital : allHospitals) {
            for (String role : roles) { // 병원당 다른 역할의 의료진 10명 + 관리자 1명 = 11명
                StaffInfo staff = new StaffInfo();

                staff.setHospitalInfo(selectedHospital);
                staff.setStaffStatus("inactive");
                staff.setStaffAuthority("usable");

                String name = faker.name().firstName();

                switch (role) {
                    case "Attending Physician":
                        staff.setStaffName(name);
                        staff.setStaffId("D-AP-" + name);
                        staff.setStaffPw("dap");
                        staff.setStaffRole("Attending Physician");
                        break;
                    case "Resident Physician":
                        staff.setStaffName(name);
                        staff.setStaffId("D-RP-" + name);
                        staff.setStaffPw("drp");
                        staff.setStaffRole("Resident Physician");
                        break;
                    case "Fellow":
                        staff.setStaffName(name);
                        staff.setStaffId("D-F-" + name);
                        staff.setStaffPw("df");
                        staff.setStaffRole("Fellow");
                        break;
                    case "Emergency Medicine Specialist":
                        staff.setStaffName(name);
                        staff.setStaffId("D-EMS-" + name);
                        staff.setStaffPw("dems");
                        staff.setStaffRole("Emergency Medicine Specialist");
                        break;
                    case "Consulting Physician":
                        staff.setStaffName(name);
                        staff.setStaffId("D-CP-" + name);
                        staff.setStaffPw("dcp");
                        staff.setStaffRole("Consulting Physician");
                        break;
                    case "Registered Nurse":
                        staff.setStaffName(name);
                        staff.setStaffId("N-RN-" + name);
                        staff.setStaffPw("nrn");
                        staff.setStaffRole("Registered Nurse");
                        break;
                    case "Emergency Room Nurse":
                        staff.setStaffName(name);
                        staff.setStaffId("N-ERN-" + name);
                        staff.setStaffPw("nern");
                        staff.setStaffRole("Emergency Room Nurse");
                        break;
                    case "Nurse Practitioner":
                        staff.setStaffName(name);
                        staff.setStaffId("N-NP-" + name);
                        staff.setStaffPw("nnp");
                        staff.setStaffRole("Nurse Practitioner");
                        break;
                    case "Clinical Nurse Specialist":
                        staff.setStaffName(name);
                        staff.setStaffId("N-CNS-" + name);
                        staff.setStaffPw("ncns");
                        staff.setStaffRole("Clinical Nurse Specialist");
                        break;
                    case "Charge Nurse":
                        staff.setStaffName(name);
                        staff.setStaffId("N-CN-" + name);
                        staff.setStaffPw("ncn");
                        staff.setStaffRole("Charge Nurse");
                        break;
                    default: // admin
                        staff.setStaffName(role);
                        staff.setStaffId(role);
                        staff.setStaffPw(role);
                        staff.setStaffRole(role);
                        break;
                }
                staffRepo.save(staff);
            }
        }
    }

    // 환자 생성 메소드
    public void patientGenerator() {
        List<HospitalInfo> allHospitals = hospitalRepo.findAll();

        for (HospitalInfo selectedHospital : allHospitals) {
            for (int i = 1; i <= random.nextInt(120, 200) + 1; i++) {
                PatientInfo patient = new PatientInfo();
                // 병원 식별자(FK)
                patient.setHospitalInfo(selectedHospital);
                // 환자 성별
                String sex = faker.options().option("Male", "Female");
                patient.setPatientSex(sex);
                // 환자 이름
                String name = sex.equals("Male") ? faker.name().malefirstName() : faker.name().femaleFirstName();
                patient.setPatientName(name);
                // 환자 생년월일
                Date birthdate = new Date(faker.date().birthday().getTime());
                patient.setPatientBirthdate(birthdate);
                // 환자 식별자(PK)
                SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
                patient.setPatientId(String.format("%s-%s", name.substring(0, 1).toUpperCase(), sdf.format(birthdate)));
                // 환자 나이
                Calendar birth = Calendar.getInstance();
                birth.setTime(birthdate);
                Calendar today = Calendar.getInstance();
                int age = today.get(Calendar.YEAR) - birth.get(Calendar.YEAR);
                if (today.get(Calendar.DAY_OF_YEAR) < birth.get(Calendar.DAY_OF_YEAR)) {
                    age--;
                }
                patient.setPatientAge(age);
                // 환자 과거이력
                StringBuilder diseaseHistory = new StringBuilder();
                for(int j = 0; j < random.nextInt(4); j++) {
                    diseaseHistory.append(faker.options().option(faker.disease().internalDisease(), faker.disease().dermatology(), faker.disease().gynecologyAndObstetrics(), faker.disease().ophthalmologyAndOtorhinolaryngology(), faker.disease().neurology(), faker.disease().surgery()));
                }
                patient.setPatientDiseaseHistory(diseaseHistory.toString());
                patientRepo.save(patient);
            }
        }
    }

    // 환자별 + 담당 의료진 입실정보 생성 메소드
    public void admissionGenerator() {
        List<PatientInfo> allPatients = patientRepo.findAll();
        List<StaffInfo> allStaffs = staffRepo.findAll();
        LocalDateTime startTime = LocalDateTime.now();

        for (PatientInfo selectedPatient : allPatients) {
            for (int i = 1; i <= random.nextInt(2) + 1; i++) {
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
                // 도착 수단
                String arrivalTransport = faker.options().option("WALK IN", "AMBULANCE");
                admission.setAdmissionArrivalTransport(arrivalTransport);
                // 입실 식별자(PK)
                admission.setAdmissionId(String.format("%s-%s-%s", arrivalTransport.equals("WALK IN") ? "W" : "A", formattedDate, "00" + faker.number().randomNumber(2, true)));
                // 환자 식별자(FK)
                admission.setPatientInfo(selectedPatient);
                // 의료진 식별자(FK)
                admission.setStaffInfo(allStaffs.get(random.nextInt(9) + 1));
                // 입실 시간
                admission.setAdmissionInTime(Timestamp.valueOf(randomDateTime));
                // 고통 정도
                admission.setAdmissionPain(faker.number().numberBetween(0, 10));
                // 호소 증상
                admission.setAdmissionChiefComplaint(faker.lorem().sentence());
                // 위험도
                admission.setAdmissionAcuity(faker.number().numberBetween(1, 5));

                admissionRepo.save(admission);
            }

        }

    }

    // 입실번호별 생체정보 생성 메소드 (ver.배치 결정)
    public void patientVitalGenerator() {
        List<AdmissionInfo> allAdmissions = admissionRepo.findAll();

        for (AdmissionInfo selectedAdmission : allAdmissions) { // admission_id(입실 식별자) 선택
            int randomCnt = random.nextInt(5,18) + 1;
            for (int i = 1; i <= randomCnt; i++) { // admission_id(입실 식별자)당 환자 바이탈 수 생성
                PatientVitalInfo currentPatientVital = patientVitalRepo.findTopByAdmissionInfoOrderByPatientVitalCreatedAtDesc(selectedAdmission);

                PatientVitalInfo presentPatientVital = new PatientVitalInfo();

                // admission_id(입실 식별자, FK)
                presentPatientVital.setAdmissionInfo(selectedAdmission);
                // 체온(°C)
                presentPatientVital.setPatientVitalTemperature(BigDecimal.valueOf(faker.number().randomDouble(1, 36, 39) - 0.5));
                // 심박수(bpm)
                presentPatientVital.setPatientVitalHr(faker.number().numberBetween(55, 125)); // 표준 범위 ± 오차 범위
                // 호흡수(min)
                presentPatientVital.setPatientVitalRespiratoryRate(faker.number().numberBetween(14, 29)); // 표준 범위 ± 오차 범위
                // 산소포화도(%%)
                presentPatientVital.setPatientVitalSpo2(BigDecimal.valueOf(faker.options().option(faker.number().randomDouble(1, 91, 96), faker.number().randomDouble(1, 97, 100)))); // 표준 범위 ± 오차 범위
                // 수축혈압(mmHg)
                presentPatientVital.setPatientVitalNibpS(faker.number().numberBetween(90, 170)); // 표준 범위 ± 오차 범위
                // 이완혈압(mmHg)
                presentPatientVital.setPatientVitalNibpD(faker.number().numberBetween(40, 110)); // 표준 범위 ± 오차 범위

                if (currentPatientVital != null) {
                    // 바이탈을 잰 시간
                    LocalDateTime vitalCreatedAt = currentPatientVital.getPatientVitalCreatedAt().toLocalDateTime();
                    Random random = new Random();
                    int minutesOffset = 30 + (random.nextInt(25) - 12);
                    int secondsOffset = random.nextInt(60);
                    vitalCreatedAt = vitalCreatedAt.plusMinutes(minutesOffset).plusSeconds(secondsOffset);
                    presentPatientVital.setPatientVitalCreatedAt(Timestamp.valueOf(vitalCreatedAt));
                } else {
                    // 바이탈을 잰 시간
                    Timestamp admissionInTime = selectedAdmission.getAdmissionInTime();
                    LocalDateTime vitalCreatedAt = admissionInTime.toLocalDateTime();
                    Random random = new Random();
                    int minutesOffset = 30 + (random.nextInt(25) - 12);
                    int secondsOffset = random.nextInt(60);
                    vitalCreatedAt = vitalCreatedAt.plusMinutes(minutesOffset).plusSeconds(secondsOffset);
                    presentPatientVital.setPatientVitalCreatedAt(Timestamp.valueOf(vitalCreatedAt));
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

    // 배치 정보
    public void resultWardGenerator() {
        List<AdmissionInfo> allAdmissions = admissionRepo.findAll();

        for(AdmissionInfo selectedAdmission : allAdmissions) {
            ResultWardInfo resultWard = new ResultWardInfo();

            // 의료진 정보 (FK)
            resultWard.setStaffInfo(randomStaff(staffRepo.findAll()));
            // 입실 정보 (FK)
            resultWard.setAdmissionInfo(selectedAdmission);
            // 의료진 실제 배치 결정
            resultWard.setResultWard(faker.options().option("Discharge", "Ward", "ICU"));
            // 배치 결정 시간
            PatientVitalInfo patientVital = patientVitalRepo.findTopByAdmissionInfoOrderByPatientVitalCreatedAtDesc(selectedAdmission);
            Timestamp admissionOutTime = patientVital.getPatientVitalCreatedAt();
            LocalDateTime resultWardUpdatedAt = admissionOutTime.toLocalDateTime();
            Random random = new Random();
            int minutesOffset = 30 + (random.nextInt(25) - 12);
            int secondsOffset = random.nextInt(60);
            resultWardUpdatedAt = resultWardUpdatedAt.plusMinutes(minutesOffset).plusSeconds(secondsOffset);

            selectedAdmission.setAdmissionOutTime(Timestamp.valueOf(resultWardUpdatedAt));
            resultWard.setResultWardUpdatedAt(Timestamp.valueOf(resultWardUpdatedAt));

            admissionRepo.save(selectedAdmission);
            resultWardRepo.save(resultWard);
        }
    }

    // 첨언 정보
    public void commentGenerator() {
        List<AdmissionInfo> allAdmissions = admissionRepo.findAll();

        for(AdmissionInfo selectedAdmission : allAdmissions) {
            CommentInfo comment = new CommentInfo();

            comment.setStaffInfo(randomStaff(staffRepo.findAll()));
            comment.setAdmissionInfo(selectedAdmission);
            comment.setComment(faker.options().option(faker.disease().internalDisease(), faker.disease().dermatology(), faker.disease().gynecologyAndObstetrics(), faker.disease().ophthalmologyAndOtorhinolaryngology(), faker.disease().neurology(), faker.disease().surgery()));
            comment.setCommentUpdatedAt(randomVital(patientVitalRepo.findByAdmissionInfo(selectedAdmission)).getPatientVitalCreatedAt());

            commentRepo.save(comment);
        }
    }

    // 병원에 있는 병상 정보
    public void bedGenerator() {
        List<HospitalInfo> allHospitals = hospitalRepo.findAll();
        for (HospitalInfo selectedHospital : allHospitals) {
            for (int i = 1; i <= 10; i++) {
                BedInfo bed = new BedInfo();
                bed.setHospitalInfo(selectedHospital);
                bed.setBedNum(i);
                bed.setBedWard("일반구역A");

                bedRepo.save(bed);
            }
            for (int i = 11; i <= 20; i++) {
                BedInfo bed = new BedInfo();
                bed.setHospitalInfo(selectedHospital);
                bed.setBedNum(i);
                bed.setBedWard("일반구역B");

                bedRepo.save(bed);
            }
            for (int i = 21; i <= 30; i++) {
                BedInfo bed = new BedInfo();
                bed.setHospitalInfo(selectedHospital);
                bed.setBedNum(i);
                bed.setBedWard("중증구역");

                bedRepo.save(bed);
            }
        }
    }

    // 입실한 환자별 위치
    public void mapGenerator() {
        List<AdmissionInfo> allAdmissions = admissionRepo.findAll();
        List<BedInfo> allBeds = bedRepo.findAll();

        for (AdmissionInfo selectedAdmission : allAdmissions) {
            MapInfo map = new MapInfo();

            map.setAdmissionInfo(selectedAdmission);
            if (selectedAdmission.getAdmissionAcuity() < 3) {
                // 중증구역
                map.setBedInfo(bedRepo.findByBedNum(random.nextInt(10) + 21));
            } else if (selectedAdmission.getAdmissionAcuity() < 5) {
                // 일반구역A, B
                map.setBedInfo(bedRepo.findByBedNum(random.nextInt(1, 21)));
            }

            mapRepo.save(map);
        }
    }

    // staff 중 admin 제외하고 하나 불러오는 메소드
    public StaffInfo randomStaff(List<StaffInfo> list) {
        if (list.isEmpty()) {
            return null;
        }
        Random random = new Random();
        int randomIndex = random.nextInt(list.size());
        while (list.get(randomIndex).getStaffRole().equals("admin")) {
            randomIndex = random.nextInt(list.size());
        }
        return list.get(randomIndex);
    }

    public PatientVitalInfo randomVital(List<PatientVitalInfo> list) {
        if (list.isEmpty()) {
            return null;
        }
        Random random = new Random();
        int randomIndex = random.nextInt(list.size());
        return list.get(randomIndex);
    }

}
