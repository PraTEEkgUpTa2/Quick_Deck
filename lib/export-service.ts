"use client";

import { Slide } from "@/lib/types";

export async function exportToPDF(slides: Slide[]): Promise<void> {
  if (typeof window === "undefined") return;

  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.getElementById('slide-preview');
  if (!element) throw new Error('Slide preview element not found');

  const opt = {
    margin: 1,
    filename: 'quickdeck.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw error;
  }
}

export async function exportToPPTX(slides: Slide[]): Promise<void> {
  if (typeof window === "undefined") return;

  const pptxgen = (await import("pptxgenjs")).default;
  const pres = new pptxgen();

  slides.forEach((slide) => {
    const pptSlide = pres.addSlide();

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

  try {
    await pres.writeFile({ fileName: "quickdeck.pptx" });
  } catch (error) {
    console.error("Error exporting to PPTX:", error);
    throw error;
  }
}
