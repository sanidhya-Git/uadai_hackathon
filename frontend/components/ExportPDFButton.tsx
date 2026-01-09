"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportPDFButton() {
  const exportPDF = async () => {
    const element = document.body;

    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      imgWidth,
      imgHeight > pageHeight ? pageHeight - 20 : imgHeight
    );

    pdf.save("aadhaar-insightx-dashboard.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      style={{
        padding: "8px 14px",
        background: "#1e90ff",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer"
      }}
    >
      📄 Export Dashboard as PDF
    </button>
  );
}

