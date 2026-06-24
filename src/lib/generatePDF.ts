import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates and downloads a PDF of the specified DOM element.
 *
 * @param elementId - The ID of the DOM element to capture.
 * @param filename - The name of the PDF file to be saved.
 */
export async function generatePDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found.`);
    return;
  }

  // Add the class to show PDF-only elements (like the branded header)
  element.classList.add('generating-pdf');

  // Wait a moment for the DOM to update and elements to become visible
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    // Capture the element as a canvas
    // scale: 2 provides retina/high-quality resolution
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    // A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm

    // Calculate the height of the image in mm proportional to the A4 width
    const canvasHeightInMm = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = canvasHeightInMm;
    let position = 0;

    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, canvasHeightInMm);
    heightLeft -= pageHeight;

    // If content is taller than one page, split across multiple pages
    while (heightLeft > 0) {
      pdf.addPage();

      /**
       * Multi-page handling:
       * Add a 10mm top margin on page 2 onwards.
       * We adjust the position so that the next portion of the image starts
       * exactly where the previous page left off, but is drawn starting at y=10mm.
       */
      position = position - (pageHeight - 10);

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, canvasHeightInMm);

      // Draw a white rectangle over the top 10mm to create a clean margin
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, imgWidth, 10, 'F');

      heightLeft -= (pageHeight - 10);
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Remove the class to revert the UI to its original state
    element.classList.remove('generating-pdf');
  }
}
