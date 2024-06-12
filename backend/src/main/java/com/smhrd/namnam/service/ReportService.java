package com.smhrd.namnam.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
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
public class ReportService {

    @Autowired
    private LogViewRepository logViewRepository;

    @Autowired
    private ERViewRepository erViewRepository;

    public byte[] generatePdf(String reportType, String startDate, String endDate) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Hospital Report"));

        if ("userActivity".equals(reportType)) {
            List<LogView> logViews = logViewRepository.searchlogInfo("", "", startDate, endDate);
            document.add(new Paragraph("Log Information"));
            Table table = new Table(new float[]{3, 3, 3, 3});
            table.addCell(new Cell().add(new Paragraph("Log Time")));
            table.addCell(new Cell().add(new Paragraph("Log User")));
            table.addCell(new Cell().add(new Paragraph("Log Action")));
            table.addCell(new Cell().add(new Paragraph("Log Description")));
            for (LogView log : logViews) {
                table.addCell(new Cell().add(new Paragraph(log.getLogTime().toString())));
                table.addCell(new Cell().add(new Paragraph(log.getLogUser())));
                table.addCell(new Cell().add(new Paragraph(log.getLogAction())));
            }
            document.add(table);
        } else if ("systemUsage".equals(reportType)) {
            // 시스템 사용 보고서 생성 로직 추가
        } else if ("patientCare".equals(reportType)) {
            List<ERView> erViews = erViewRepository.findMedicalPatients("search", "All", "All", "All");
            document.add(new Paragraph("ER Information"));
            Table table = new Table(new float[]{3, 3, 3, 3});
            table.addCell(new Cell().add(new Paragraph("Admission ID")));
            table.addCell(new Cell().add(new Paragraph("Patient ID")));
            table.addCell(new Cell().add(new Paragraph("Patient Name")));
            table.addCell(new Cell().add(new Paragraph("Ward")));
            for (ERView er : erViews) {
                table.addCell(new Cell().add(new Paragraph(er.getAdmissionId())));
                table.addCell(new Cell().add(new Paragraph(er.getPatientId())));
                table.addCell(new Cell().add(new Paragraph(er.getPatientName())));
                table.addCell(new Cell().add(new Paragraph(er.getBedWard())));
            }
            document.add(table);
        }

        document.close();
        return baos.toByteArray();
    }

    // 기존의 generatePdf 메서드를 통합하여 사용
    public byte[] generatePdf() {
        return generatePdf("userActivity", "", "");
    }
}
