package com.smhrd.namnam.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.smhrd.namnam.entity.LogView;
import com.smhrd.namnam.entity.ERView;
import com.smhrd.namnam.repository.LogViewRepository;
import com.smhrd.namnam.repository.ERViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfService {

    @Autowired
    private LogViewRepository logViewRepository;

    @Autowired
    private ERViewRepository erViewRepository;

    public byte[] generatePdf() {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // 제목 추가
        document.add(new Paragraph("Hospital Report"));

        // LogView 데이터를 위한 테이블 생성
        List<LogView> logViews = logViewRepository.findAllOrderByLogTimeDesc();
        document.add(new Paragraph("Log Information"));
        Table logTable = new Table(new float[]{3, 3, 3, 3});
        logTable.addCell("Log Time");
        logTable.addCell("Log User");
        logTable.addCell("Log Action");
        logTable.addCell("Log Description");
        for (LogView log : logViews) {
            logTable.addCell(log.getLogTime().toString());
            logTable.addCell(log.getLogUser());
            logTable.addCell(log.getLogAction());
        }
        document.add(logTable);

        // ERView 데이터를 위한 테이블 생성
        List<ERView> erViews = erViewRepository.findAll();
        document.add(new Paragraph("ER Information"));
        Table erTable = new Table(new float[]{3, 3, 3, 3});
        erTable.addCell("Admission ID");
        erTable.addCell("Patient ID");
        erTable.addCell("Patient Name");
        erTable.addCell("Ward");
        for (ERView er : erViews) {
            erTable.addCell(er.getAdmissionId());
            erTable.addCell(er.getPatientId());
            erTable.addCell(er.getPatientName());
            erTable.addCell(er.getBedWard());
        }
        document.add(erTable);

        document.close();
        return baos.toByteArray();
    }
}
