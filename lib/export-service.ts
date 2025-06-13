"use client";

import { Slide } from "@/lib/types";
import pptxgen from "pptxgenjs";
import jsPDF from 'jspdf';

export async function exportToPDF(slides: Slide[]): Promise<void> {
  try {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    slides.forEach((slide, index) => {
      if (index > 0) {
        pdf.addPage();
      }

      // Set title font
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      
      // Add title
      const titleLines = pdf.splitTextToSize(slide.title, contentWidth);
      pdf.text(titleLines, margin, margin + 15);
      
      // Calculate title height
      const titleHeight = titleLines.length * 8;
      let currentY = margin + 15 + titleHeight + 10;

      // Set bullet point font
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');

      // Add bullet points
      slide.bullets.forEach((bullet) => {
        // Add bullet symbol
        pdf.text('•', margin, currentY);
        
        // Add bullet text with proper wrapping
        const bulletLines = pdf.splitTextToSize(bullet, contentWidth - 10);
        pdf.text(bulletLines, margin + 8, currentY);
        
        // Update Y position for next bullet
        currentY += bulletLines.length * 6 + 4;
        
        // Check if we need a new page
        if (currentY > pageHeight - margin) {
          pdf.addPage();
          currentY = margin + 15;
        }
      });

      // Add slide number at bottom
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${index + 1} / ${slides.length}`, pageWidth - margin - 20, pageHeight - 10);
    });

    // Save the PDF
    pdf.save('quickdeck-presentation.pdf');
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw error;
  }
}

export async function exportToPPTX(slides: Slide[]): Promise<void> {
  try {
    const pres = new pptxgen();
    
    slides.forEach((slide) => {
      const pptSlide = pres.addSlide();
      
      // Add title with consistent styling
      pptSlide.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        w: '90%',
        h: 1,
        fontSize: 44,
        bold: true,
        color: '363636',
        align: 'left',
      });
      
      // Add bullets with consistent formatting
      slide.bullets.forEach((bullet, idx) => {
        pptSlide.addText(bullet, {
          x: 0.5,
          y: 2 + (idx * 0.8),
          w: '90%',
          fontSize: 24,
          bullet: { type: 'bullet' },
          color: '666666',
        });
      });
    });
    
    await pres.writeFile({ fileName: "quickdeck-presentation.pptx" });
  } catch (error) {
    console.error("Error exporting to PPTX:", error);
    throw error;
  }
}