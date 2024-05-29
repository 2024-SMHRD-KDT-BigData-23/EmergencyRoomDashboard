package com.smhrd.namnam.config;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.PatientVitalInfo;
import com.smhrd.namnam.repository.AdmissionInfoRepository;
import com.smhrd.namnam.repository.PatientVitalInfoRepository;
import net.datafaker.Faker;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataLoader {

    private PatientVitalInfoRepository patientVitalRepo;
    private AdmissionInfoRepository admissionRepo;
    private Faker faker = new Faker();

    public DataLoader(PatientVitalInfoRepository patientVitalRepo, AdmissionInfoRepository admissionRepo) {
        this.patientVitalRepo = patientVitalRepo;
        this.admissionRepo = admissionRepo;
    }

    public void generateData() {
        List<AdmissionInfo> allAdmissions = admissionRepo.findAll();
        LocalDateTime startTime = LocalDateTime.now();

        for(AdmissionInfo selectedAdmission : allAdmissions) {
            for (int i = 1; i <= 10; i++) {
                PatientVitalInfo patientVital = new PatientVitalInfo();

                patientVital.setAdmissionInfo(selectedAdmission);

                patientVital.setPatientVitalSex(faker.bool().bool() ? "Male" : "Female");
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
                patientVital.setPatientVitalPain(faker.number().numberBetween(1, 10));
                patientVital.setPatientVitalChiefComplaint(faker.lorem().sentence());
                patientVital.setPatientVitalAcuity(faker.number().numberBetween(1, 5));
                patientVital.setPatientVitalCreatedAt(new Timestamp(System.currentTimeMillis()));

                LocalDateTime createAt = startTime.plusMinutes(10L * i);
                patientVital.setPatientVitalCreatedAt(Timestamp.valueOf(createAt));

                patientVitalRepo.save(patientVital);
            }
        }
    }
}
