// components/PdfExportButton.tsx
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

type TestResult = {
  userId: string;
  testName: string;
  completedAt: string;
  scores: {
    category: string;
    score: number;
    percentile: number;
    interpretation: string;
  }[];
  overallScore: number;
  overallPercentile: number;
  overallInterpretation: string;
};

type PdfExportButtonProps = {
  testResult: TestResult;
};

export default function PdfExportButton({ testResult }: PdfExportButtonProps) {
  console.log(testResult);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = async () => {
    setIsGenerating(true);
    try {
      // Create new jsPDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // PDF dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - (margin * 2);
      
      // Add header with logo and title
      addHeader(pdf, pageWidth);
      
      // Add title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.text('Psychometric Assessment Results', pageWidth / 2, 40, { align: 'center' });
      
      // Add test information
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Test Name: ${testResult.testName}`, margin, 50);
      pdf.text(`Completed on: ${new Date(testResult.completedAt).toLocaleDateString()}`, margin, 55);
      pdf.text(`Candidate ID: ${testResult.userId}`, margin, 60);
      
      // Add overall results section
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.text('Overall Results', margin, 70);
      
      // Draw overall score box
      pdf.setFillColor(246, 246, 246);
      pdf.setDrawColor(204, 204, 204);
      pdf.rect(margin, 75, contentWidth, 25, 'FD');
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text(`Overall Score: ${testResult.overallScore}`, margin + 5, 82);
      pdf.text(`Percentile: ${testResult.overallPercentile}%`, margin + 5, 89);
      pdf.text(`Range: ${getScoreRange(testResult.overallPercentile)}`, contentWidth - 40, 82);
      
      // Add interpretation
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Interpretation', margin, 110);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      // Add interpretation text with word wrapping
      const interpretationLines = pdf.splitTextToSize(
        testResult.overallInterpretation, 
        contentWidth
      );
      pdf.text(interpretationLines, margin, 117);
      
      // Calculate vertical position after interpretation
      let yPosition = 117 + (interpretationLines.length * 5);
      
      // Add detailed scores section
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text('Detailed Scores', margin, yPosition + 10);
      
      yPosition += 15;
      
      // Create header for scores table
      const headers = ['Category', 'Score', 'Percentile', 'Range'];
      const columnWidths = [60, 25, 25, 30];
      const startX = margin;
      
      // Draw table header
      pdf.setFillColor(238, 238, 238);
      pdf.setDrawColor(204, 204, 204);
      pdf.rect(startX, yPosition, contentWidth, 10, 'FD');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(33, 33, 33);
      
      let xPosition = startX + 3;
      headers.forEach((header, i) => {
        pdf.text(header, xPosition, yPosition + 6);
        xPosition += columnWidths[i];
      });
      
      yPosition += 10;
      
      // Draw table rows
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 80, 80);
      
      let alternateRow = false;
      let currentPage = 1;
      
      for (const score of testResult.scores) {
        // Check if we need to add a new page
        if (yPosition > pageHeight - 40) {
          addFooter(pdf, pageWidth, pageHeight, currentPage);
          pdf.addPage();
          currentPage++;
          // Reset position and add header on new page
          yPosition = 30;
          addHeader(pdf, pageWidth);
        }
        
        // Draw row background
        if (alternateRow) {
          pdf.setFillColor(249, 249, 249);
          pdf.rect(startX, yPosition, contentWidth, 15, 'F');
        }
        
        // Draw row content
        xPosition = startX + 3;
        pdf.text(score.category, xPosition, yPosition + 6);
        
        xPosition += columnWidths[0];
        pdf.text(score.score.toString(), xPosition, yPosition + 6);
        
        xPosition += columnWidths[1];
        pdf.text(`${score.percentile}%`, xPosition, yPosition + 6);
        
        xPosition += columnWidths[2];
        pdf.text(getScoreRange(score.percentile), xPosition, yPosition + 6);
        
        yPosition += 15;
        alternateRow = !alternateRow;
      }
      
      // Add footer to the last page
      addFooter(pdf, pageWidth, pageHeight, currentPage);
      
      // Save the PDF
      pdf.save(`prepacademy-results-${testResult.userId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Helper function to get score range based on percentile
  const getScoreRange = (percentile: number): string => {
    if (percentile >= 90) return 'Excellent';
    if (percentile >= 75) return 'Above Average';
    if (percentile >= 40) return 'Average';
    if (percentile >= 25) return 'Below Average';
    return 'Needs Improvement';
  };
  
  // Function to add header to PDF
  const addHeader = (pdf: jsPDF, pageWidth: number) => {
    // Draw header background
    pdf.setFillColor(41, 98, 255);
    pdf.rect(0, 0, pageWidth, 20, 'F');
    
    // Add logo text
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text('PREPACADEMY', 10, 13);
    
    // Add subtitle
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Psychometric Assessment Report', pageWidth - 10, 13, { align: 'right' });
  };
  
  // Function to add footer to PDF
  const addFooter = (pdf: jsPDF, pageWidth: number, pageHeight: number, pageNumber: number) => {
    // Draw footer line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, pageHeight - 15, pageWidth - 10, pageHeight - 15);
    
    // Add footer text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    
    const today = new Date().toLocaleDateString();
    pdf.text(`Prepacademy Assessment Results | Generated on ${today}`, 10, pageHeight - 10);
    
    const pageInfo = `Page ${pageNumber}`;
    pdf.text(pageInfo, pageWidth - 10, pageHeight - 10, { align: 'right' });
  };

  return (
    <button
      onClick={generatePdf}
      disabled={isGenerating}
      style={{
        backgroundColor: '#2962ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: 500,
        cursor: isGenerating ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {isGenerating ? 'Generating PDF...' : 'Export PDF'}
      {!isGenerating && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 13L12 16L15 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}